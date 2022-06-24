import { Controller, Get } from '@nestjs/common';
import { LoginService } from './login.service';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    OAuthRequest() : Observable<AxiosResponse<any, any>> {
        console.log('notlol')
        return this.loginService.returnToken()
        // return 'Trying to login yo'
    }

    // @Get(':callback')
    // callback() {

    // }

}


