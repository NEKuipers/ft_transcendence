import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service"
import { User } from '../../users/user.interface'

@Injectable()
export class SessionSerialiser extends PassportSerializer {
    // constructor() { }

    serializeUser(user: User, done: Function) {
        done(null, user)
    }
    deserializeUser(payload: any, done: Function) {
        let userdb;
        done(null, userdb)
    }
}