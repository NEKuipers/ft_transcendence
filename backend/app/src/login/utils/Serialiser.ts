import { PassportSerializer } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service"
import { User } from '../../users/user.interface'
import { DeSerializeDone, IntraUserDetails, SerializeDone, SerializedUserDetails } from '../login.types'
import { LoginService } from "../login.service";

@Injectable()
export class SessionSerialiser extends PassportSerializer {
    constructor(private readonly userService: UsersService) {
        super();
     }

    serializeUser(user: User, done: SerializeDone) {
		// console.log("serializing: ", user);
        done(null, { id: user.id })
    }
    async deserializeUser(user: SerializedUserDetails, done: DeSerializeDone): Promise<User | void> {
		// console.log("de-serializing: ", user);

        const userDB = await this.userService.findOne(user.id)
        return userDB ? done(null, userDB) : done(null, null)
    }
}