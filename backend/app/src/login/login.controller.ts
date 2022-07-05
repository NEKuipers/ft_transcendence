import { Controller, Get, Redirect, Res, Query, UseGuards, UseFilters } from '@nestjs/common';
import { Response } from 'express'
import { LoginService } from './login.service';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PassportStrategy } from '@nestjs/passport';
import { passport } from 'passport-42'
import { stringify } from 'querystring';
import { AuthenticatedGuard, IntraAuthGuard } from './guards';
import { User } from '../users/user.interface'
import { UsersService } from 'src/users/users.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    /* 
        This is the route for intra authentication
    */
    @Get()
    @UseGuards(IntraAuthGuard)
    OAuthRequest(): any {
        return;
    }

    /* 
        This is the redirect URL the OAuth2 Provider will call
    */
    @Get('callback')
    @UseGuards(IntraAuthGuard)
    callback(@Res() res: Response) {
        console.log(res.req.query.code)
        console.log('PORCALAMADONNAMAIALADIOCANACCIOARRUGGINITOAFAPOMPINI')
        res.status(200).send('Hi there')
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status() {
        return 'ok'
    }

}


