import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Session, Response, Request, HttpException } from '@nestjs/common';
import { TwoFactorAuthService } from './two_factor_auth.service';
import { TwoFactorAuth } from './two_factor_auth.interface';
import { TFAGuard } from './tfa.guard';

@Controller('two-factor-auth')
export class TwoFactorAuthController {
	constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

	@Get('/keyuri')
	get_key_uri(@Session() session: any): Promise<string> {
		// TODO: Get userId from oauth
		let userId = 3;
		return this.twoFactorAuthService.get_keyuri(userId, session);
	}

	@Get('/login/:token')	// Is this really how i want to send the token?
	async login(@Param('token') token: string, @Session() session: any): Promise<string> {
		// TODO: Get userId from oauth
		let userId = 3;

		let login_status = await this.twoFactorAuthService.login(userId, token, session);

		if (login_status) {
			return "Login success";
		} else {
			throw new HttpException("Invalid token", 401);
		}
	}

	@Get('/logout')
	@UseGuards(TFAGuard)
	logout(@Session() session: any): string {
		if (this.twoFactorAuthService.logout(session)) {
			return "Logout success"
		}
		
		throw new HttpException("You do not have 2fa enabled!", 403);
	}

	/*
	@Get("test")
	@UseGuards(TFAGuard)
	only_when_logged_in() : string {
		return "You are logged in!";
	}
	*/
}
