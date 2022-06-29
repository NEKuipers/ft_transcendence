import { User } from './user.interface';
export declare class UsersService {
    users: User[];
    findAll(): User[];
    findOne(id: number): User;
    findOneByName(username: string): User;
}
