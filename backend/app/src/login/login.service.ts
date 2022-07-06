import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserDetails } from './login.types'
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { User } from '../users/user.interface'

@Injectable()
export class LoginService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(details: UserDetails) {
        const userName = details.username
        const userDb = await this.userService.findOneByName(userName) // This probably should be changed to ID
        if (userDb) {
            console.log('Found user', userDb.username)
            return userDb
        }
        else {
            /* There has got be a better place to do this, right? Or perhaps not */
            // console.log('It\'s hammer-time')
            const username = userName
            const status = 'online'
            const avatar_id = 1
            const oauth_refresh_token = 'Chill'
            const oauth_token_expiration_time = '2020-07-20 11:44:34'
            const is_logged_in = true
            const CreateUserDto = { username, status, avatar_id, oauth_refresh_token, oauth_token_expiration_time, is_logged_in }
            return await this.userService.createUser(CreateUserDto)
        }
    }

    createUser() {

    }

    async findUser(username: string): Promise<User | undefined> {
        return await this.userService.findOneByName(username)
        // throw new Error('Method not implemented.')
    }

    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.userService.findOneByName(username)
    //     if (user && user.oauth_refresh_token === pass) {
    //         const { oauth_refresh_token, ...result } = user;
    //         return result
    //     }
    //     return null
    // }
}
