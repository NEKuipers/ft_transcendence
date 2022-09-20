import { TwoFactorAuthService } from './two_factor_auth.service';
export declare class TwoFactorAuthController {
    private readonly twoFactorAuthService;
    constructor(twoFactorAuthService: TwoFactorAuthService);
    get_key_uri(req: any, session: any): Promise<string>;
    login(req: any, token: string, session: any): Promise<string>;
    only_when_logged_in(): string;
}
