import { UsersService } from './users.service';
import { User, newUsername, newAvatar } from './user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    editUsername(req: any, newname: newUsername): Promise<string>;
    updateAvatar(req: any, newavatar: newAvatar): Promise<string>;
    setOnline(req: any): Promise<void>;
    setOffline(req: any): Promise<void>;
}
