export declare class TwoFactorAuthService {
    get_secret(userId: number, session: any): Promise<[boolean, string]>;
    is_tfa_setup(userId: number, session: any): Promise<boolean>;
    get_keyuri(userId: number, session: any): Promise<string>;
    login(userId: number, token: string, session: any): Promise<boolean>;
    logout(session: any): boolean;
}
