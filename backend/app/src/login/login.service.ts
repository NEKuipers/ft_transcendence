import { Injectable } from '@nestjs/common';
import { UserDetails } from './login.types'
import { UsersService } from '../users/users.service';
import { User } from '../users/user.interface'

@Injectable()
export class LoginService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(details: UserDetails) {
        const userDb = await this.findUser(details.id)
        if (userDb) {
            console.log('Found user', userDb.username)
            return userDb
        }
        else {
            /* There has got be a better place to do this, right? Or perhaps not */
            const username = details.username
            const status = 'online'
            const avatar_id = 1
            const oauth_refresh_token = 'Chill'
            const oauth_token_expiration_time = '2020-07-20 11:44:34'
            const is_logged_in = true
            const CreateUserDto = { username, status, avatar_id, oauth_refresh_token, oauth_token_expiration_time, is_logged_in }
            return await this.userService.createUser(CreateUserDto)
        }
    }

    async findUser(id: number): Promise<User | undefined> {
        return await this.userService.findOne(id)
    }

}
