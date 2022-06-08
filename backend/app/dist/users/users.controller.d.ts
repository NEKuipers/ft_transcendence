import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): User[];
    findOne(id: any): User;
    create(CreateUserDto: CreateUserDto): string;
    delete(id: any): string;
    update(updateUserDto: CreateUserDto, id: any): string;
}
