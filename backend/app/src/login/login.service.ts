import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../users/users.service'
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class LoginService {
    // constructor(private readonly httpService: HttpService) {}
    constructor(private readonly userService: UsersService) {}

    returnUri(): string {
        return 'https://api.intra.42.fr/oauth/authorize?client_id=' + process.env.CLIENT_ID 
        + '&redirect_uri=' + 'http://localhost:3030/callback' + '&scope=public&state=authstate&response_type=code'
        // const auth = 'https://api.intra.42.fr/oauth/authorize?'
        // console.log('turboskrrrrrt' + this.httpService.get('https://ecosia.com'))
        // const res = this.httpService.get('https://api.intra.42.fr/oauth/authorize', {
        //      params: {
        //         client_id: process.env.CLIENT_ID,
        //         redirect_uri: 'http://localhost:3030/callback',
        //         scope: 'public',
        //         state: 'auth_state',
        //         response_type: 'code'
        //     }})
        // res.subscribe(
        //     response => response.redirect()
        // )

        // return res
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByName(username)
        if (user && user.oauth_refresh_token === pass) {
            const { oauth_refresh_token, ...result } = user;
            return result
        }
        return null
    }
}
