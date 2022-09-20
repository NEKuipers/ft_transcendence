export interface AuthenticationProvider {
    validateUser(): any;
    createUser(): any;
    findUser(): any;
}
