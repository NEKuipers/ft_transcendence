import { User } from './user.interface';
import { HttpService } from '@nestjs/axios';
export declare class UsersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    users: User[];
    findAll(): Promise<User[]>;
    findOne(id: number): User;
    findOneByName(userName: string): User;
}
