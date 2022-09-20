import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TwoFactorAuth } from './two_factor_auth.interface';

import { authenticator } from '@otplib/preset-default';

import axios, { AxiosError } from 'axios';

@Injectable()
export class TwoFactorAuthService {
	// The secret is stored in the session while it is not yet validated
	// One you have validated that you are logged in will it be removed from the session and be put in the database
	// This function will return [validated, token]
	async get_secret(userId: number, session: any): Promise<[boolean, string]> {
		// Logic:
		//	Get secret from database, if it exists, return [true, token]
		//	Otherwise get it from the session, if it does not exist generate a new one and return [false, token]

		let ret = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/two_factor_auth?user_id=eq.${userId}`)

		let seed = ret.data[0]?.seed;
		if (seed) {
			//console.log("Got from database!");
			return [true, seed];
		}

		if (!session.tfa_token) {
			session.tfa_token = authenticator.generateSecret();
			console.log("Generated session token: ", session.tfa_token)
		}
		return [false, session.tfa_token as string]
	}

	// This function will return wheter 2fa has been successfully setup
	async is_tfa_setup(userId: number, session: any): Promise<boolean> {
		if (session.tfa_setup !== undefined) {	// Cache this so we don't make a database request for every page load
			return session.tfa_setup;
		}

		let ret = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/two_factor_auth?user_id=eq.${userId}`);
		let is_setup = ret.data[0] !== undefined;

		session.tfa_setup = is_setup;

		return is_setup;
	}

	async get_keyuri(userId: number, session: any): Promise<string> {
		let secret = await this.get_secret(userId, session);
		if (secret[0]) {
			throw new HttpException("2FA is already setup!", 403);
		}

		let ret = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${userId}`);
		let username = ret.data[0]?.username;

		if (username === undefined) {
			throw new HttpException("Failed to fetch username from user id!", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return authenticator.keyuri(username, "ft_transcendence", secret[1]);
	}

	async login(userId: number, token: string, session: any): Promise<boolean> {
		if (session.tfa_authenticated) {	// Whats the point?
			return true;
		}

		let secret = await this.get_secret(userId, session);

		let success = authenticator.verify(
			{
				token: token, 
				secret: secret[1]
			}
		);

		if (success && secret[0] == false) {
			// This is the first login, upload this secret to the database
			//console.log("First login complete!");

			axios.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/two_factor_auth`, {"user_id": userId, "seed": secret[1]})
				.then((response) => {
					if (response.status != HttpStatus.CREATED) {
						console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`);
					}
				})
				.catch((error: AxiosError) => {
					console.log(`Got error: ${error}`);
					console.log(`data ${JSON.stringify(error.response.data)}`);
				})
			
			delete session.tfa_token;
		}

		session.tfa_authenticated = success;
		session.tfa_setup = true;

		return success;
	}

	logout(session: any): boolean {
		if (session.tfa_authenticated) {
			session.tfa_authenticated = false;
			return true;
		}
		return false;
	}
}
