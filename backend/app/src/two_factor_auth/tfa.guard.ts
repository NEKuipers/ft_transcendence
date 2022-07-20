import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TwoFactorAuthService } from './two_factor_auth.service';
import { AuthenticatedGuard } from 'src/login/guards';

@Injectable()
export class TFAGuard extends AuthenticatedGuard {
	constructor(private readonly twoFactorAuthService: TwoFactorAuthService) { super() }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (!await super.canActivate(context)) {
			return false;
		}
		
		const request = context.switchToHttp().getRequest();

		let userId = request.user.id;

		// Sanity check
		if (userId === undefined) {
			throw new HttpException("Cannot use TFA guard while not using OAuth", 500);
		}

		let needs_tfa = await this.twoFactorAuthService.is_tfa_setup(userId, request.session);
		if (needs_tfa) {
			if (!request.session.tfa_authenticated) {
				return false;
			}
		}

		return true;
	}
}