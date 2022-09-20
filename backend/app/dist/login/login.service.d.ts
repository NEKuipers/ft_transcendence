import { IntraUserDetails } from './login.types';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.interface';
export declare class LoginService {
    private readonly userService;
    constructor(userService: UsersService);
    validateUser(details: IntraUserDetails): Promise<User>;
}
