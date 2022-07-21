import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Session, Response, Request, HttpException, Req, Res } from '@nestjs/common';
import { TwoFactorAuthService } from './two_factor_auth.service';
import { TwoFactorAuth } from './two_factor_auth.interface';
import { TFAGuard } from './tfa.guard';
import { AuthenticatedGuard } from 'src/login/guards';

@Controller('two-factor-auth')
export class TwoFactorAuthController {
	constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

	@Get('/keyuri')
	@UseGuards(AuthenticatedGuard)
	get_key_uri(@Req() req: any, @Session() session: any): Promise<string> {
		let userId = req.user.id;

		return this.twoFactorAuthService.get_keyuri(userId, session);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('/login/:token')	// Is this really how i want to send the token?
	async login(@Req() req: any, @Param('token') token: string, @Session() session: any): Promise<string> {
		let userId = req.user.id;

		let login_status = await this.twoFactorAuthService.login(userId, token, session);

		if (login_status) {
			return "Login success";
		} else {
			throw new HttpException("Invalid token", 401);
		}
	}
	
	@Get("test")
	@UseGuards(TFAGuard)
	only_when_logged_in() : string {
		return "You are logged in!";
	}
}
