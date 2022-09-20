import { LoginService } from '../login.service';
declare const intraStrategy_base: new (...args: any[]) => any;
export declare class intraStrategy extends intraStrategy_base {
    private readonly loginService;
    constructor(loginService: LoginService);
    validate(accessToken: string, refreshToken: string, userProfile: any, callback: (error: any, user: any) => void): Promise<void>;
}
export {};
