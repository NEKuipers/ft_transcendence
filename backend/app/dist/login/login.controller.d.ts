import { Response } from 'express';
import { TwoFactorAuthService } from 'src/two_factor_auth/two_factor_auth.service';
import { UsersService } from 'src/users/users.service';
export declare class LoginController {
    private readonly twoFactorAuthService;
    private readonly usersService;
    constructor(twoFactorAuthService: TwoFactorAuthService, usersService: UsersService);
    OAuthRequest(): any;
    callback(req: any, session: any, res: Response): Promise<void>;
    logout(req: any, session: any): Promise<string>;
    jwt(req: any): Promise<string>;
    whoami(req: any, session: any): Promise<Object>;
    status(): string;
}
