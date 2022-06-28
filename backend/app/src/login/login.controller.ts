import { Controller, Get, Redirect, Res, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    @Redirect()
    OAuthRequest(): any {
    // OAuthRequest() : Observable<AxiosResponse<any, any>> {
        console.log('notlol ' + process.env.CLIENT_ID)
        return this.loginService.returnUri()
        // {url: 'https://api.intra.42.fr/oauth/authorize?client_id=' + process.env.CLIENT_ID 
        //   + '&redirect_uri=' + 'http://localhost:3030/callback' + '&scope=public&state=authstate&response_type=code'}
        // return this.loginService.returnToken()
        // return 'Trying to login yo'
    }

    // @Get(':callback')
    // callback() {

    // }

}


