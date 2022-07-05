import { PassportSerializer } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service"
import { User } from '../../users/user.interface'
import { Done } from '../login.types'
import { LoginService } from "../login.service";



@Injectable()
export class SessionSerialiser extends PassportSerializer {
    constructor(private readonly loginService: LoginService) {
        super();
     }

    serializeUser(user: User, done: Done) {
        done(null, user)
    }
    async deserializeUser(user: User, done: Done): Promise<User | void> {
        const userDB = await this.loginService.findUser(user.username)
        return userDB ? done(null, userDB) : done(null, null)
    }
}