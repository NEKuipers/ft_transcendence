import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserDetails } from './login.types'
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/create-user.dto';

@Injectable()
export class LoginService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(details: UserDetails) {
        const userId = details.id
        const userName = details.username
        // Here we have to interact with the database to find or create this user
        // If User doesn't exist, create user in DB and consider them signed in.
        // If User exists, turn them into signed in
        const userDb = await this.userService.findOneByName(userName) // This probably should be changed to ID
        if (userDb) {
            console.log('Found user', userDb.username)
        }
        else {
            /* There has got be a better place to do this, right? */
            console.log('It\'s hammer-time')
            const username = userName
            const status = 'online'
            const avatar_id = 1
            const oauth_refresh_token = 'Chill'
            const oauth_token_expiration_time = '2020-07-20 11:44:34'
            const is_logged_in = true
            const CreateUserDto = { username, status, avatar_id, oauth_refresh_token, oauth_token_expiration_time, is_logged_in }
            await this.userService.createUser(CreateUserDto)
        } // video at 1:08:00
    }

    createUser() {

        // throw new Error('Method not implemented.')
    }

    findUser() {
        throw new Error('Method not implemented.')
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
