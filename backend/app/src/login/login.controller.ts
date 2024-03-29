import { Controller, Get, Param, Patch, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express'
import { TFAGuard } from 'src/two_factor_auth/tfa.guard';
import { TwoFactorAuthService } from 'src/two_factor_auth/two_factor_auth.service';
import { AuthenticatedGuard, IntraAuthGuard } from './guards';
import { UsersService } from 'src/users/users.service';
import * as jwt from "jsonwebtoken";
import axios from 'axios';

@Controller('login')
export class LoginController {
    // constructor(private readonly loginService: LoginService) {}
	constructor(private readonly twoFactorAuthService: TwoFactorAuthService, private readonly usersService: UsersService) {}

    /* 
        This is the route for intra authentication
    */
    @Get()
    @UseGuards(IntraAuthGuard)
    OAuthRequest(): any {
		console.log('GET ON LOGIN')
        return 'Ye';
    }

    /* 
        This is the redirect URL the OAuth2 Provider will call
    */
    @Get('callback')
    @UseGuards(IntraAuthGuard)
    async callback(@Req() req: any, @Session() session: any, @Res() res: Response) {
		console.log('GET ON CALLBACK')
		if (await this.twoFactorAuthService.is_tfa_setup(req.user.id, session)) {
			res.redirect(`${process.env.HOST_URL}/tfa`)	// Ya gotta login here too!
		} else {
			await axios.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${req.user.id}`, {is_logged_in: true, status: 'online'});
			if (req.user.firstLogin) {
				res.redirect(`${process.env.HOST_URL}/setup-account`)
			} else {
				res.redirect(`${process.env.HOST_URL}/`)
			}
		}
    }

	@Get('/logout')
	@UseGuards(AuthenticatedGuard)
	async logout(@Req() req: any, @Session() session: any): Promise<string> {
		await axios.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${req.user.id}`, {is_logged_in: false, status: 'offline'});
		return new Promise((resolve, reject) => {
			this.twoFactorAuthService.logout(session);

			req.logout((err: any) => {
				if (err) {
					console.error("got err: ", err)
					reject(err)
				} else {
					resolve("Logout success!");
				}
			});
		})
	}

	@Get('/jwt')
	@UseGuards(TFAGuard)
	async jwt(@Req() req: any): Promise<string> {
		return jwt.sign(
			{
				userid: req.user.id,
				username: req.user.username,
			},
			process.env.JSON_WEB_TOKEN_SECRET,
			{
				expiresIn: "10h",
			}
		)
	}

	@Get('/whoami')
	@UseGuards(TFAGuard)
	async whoami(@Req() req: any, @Session() session): Promise<Object> {
		return {
			userID: req.user.id,
			userName: req.user.username,
			TFAEnabled: await this.twoFactorAuthService.is_tfa_setup(req.user.id, session)
		};
	}

    @Get('status')
    @UseGuards(TFAGuard)	// TFA guard includes AuthenticatedGuard
    status() {
        return 'ok'
    }

}


