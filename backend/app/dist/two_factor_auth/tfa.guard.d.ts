import { ExecutionContext } from '@nestjs/common';
import { TwoFactorAuthService } from './two_factor_auth.service';
import { AuthenticatedGuard } from 'src/login/guards';
export declare class TFAGuard extends AuthenticatedGuard {
    private readonly twoFactorAuthService;
    constructor(twoFactorAuthService: TwoFactorAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
