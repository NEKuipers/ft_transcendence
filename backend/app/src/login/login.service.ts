import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserDetails } from './login.types'
import { UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(details: UserDetails) {
        const userId = details.id
        // Here we have to interact with the database to find or create this user
        // If User doesn't exist, create user in DB and consider them signed in.
        // If User exists, turn them into signed in
        const userDb = await this.userService.findOneByName(details.username) // This probably should be changed to ID
        if (userDb) {
            console.log('Found user', userDb.username)
        } // video at 1:08:00
    }

    createUser() {
        throw new Error('Method not implemented.')
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
