import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(createUserDto: CreateUserDto): string;
    delete(id: any): string;
    update(updateUserDto: CreateUserDto, id: number): string;
}