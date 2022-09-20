import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';
export declare class UsersService {
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | undefined>;
    findOneIntra(intra_id: number): Promise<User | undefined>;
    findOneByName(userName: string): Promise<User | undefined>;
    createUser(CreateUserDto: CreateUserDto): Promise<User | undefined>;
    setOnline(id: number): Promise<void>;
    setOffline(id: number): Promise<void>;
    changeUsername(id: number, newUsername: string): Promise<string>;
    changeAvatar(id: number, newavatar: number): Promise<string>;
}
