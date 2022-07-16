import { User } from './user.interface';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './create-user.dto';
export declare class UsersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    users: User[];
    user: User;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByName(userName: string): Promise<User>;
    createUser(CreateUserDto: CreateUserDto): Promise<User>;
}
