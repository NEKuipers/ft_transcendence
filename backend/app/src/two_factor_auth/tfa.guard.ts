import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TwoFactorAuthService } from './two_factor_auth.service';

@Injectable()
export class TFAGuard implements CanActivate {
	constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		// TODO: Get userId from oauth
		let userId = 3;

		let needs_tfa = await this.twoFactorAuthService.is_tfa_setup(userId, request.session);
		if (needs_tfa) {
			if (!request.session.tfa_authenticated) {
				return false;
			}
		}

		return true;
	}
}