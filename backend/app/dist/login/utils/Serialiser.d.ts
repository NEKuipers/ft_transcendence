import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../../users/users.service";
import { User } from '../../users/user.interface';
import { DeSerializeDone, SerializeDone, SerializedUserDetails } from '../login.types';
export declare class SessionSerialiser extends PassportSerializer {
    private readonly userService;
    constructor(userService: UsersService);
    serializeUser(user: User, done: SerializeDone): void;
    deserializeUser(user: SerializedUserDetails, done: DeSerializeDone): Promise<User | void>;
}
