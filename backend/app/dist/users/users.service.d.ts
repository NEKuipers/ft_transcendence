import { User } from './interfaces/user.interface';
export declare class UsersService {
    users: User[];
    findAll(): User[];
    findOne(id: number): User;
}
