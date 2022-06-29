import { Controller, Get, Redirect, Res, Query, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { LoginService } from './login.service';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PassportStrategy } from '@nestjs/passport';
import { passport } from 'passport-42'
import { stringify } from 'querystring';
import { IntraAuthGuard } from './guards';

@Controller('login')
@UseGuards(IntraAuthGuard)
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    /* 
        This is the route for intra authentication
    */
    @Get()
    @Redirect()
    OAuthRequest(): any {
    // OAuthRequest() : Observable<AxiosResponse<any, any>> {
        var FortyTwoStrategy = require('passport-42').Strategy
        // var passport = require('passport')

        console.log('Buongiorno diobestia')
        passport.use(new FortyTwoStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://127.0.0.1:3000/callback',
            profileFields: {
                'id': function (obj) { return stringify(obj.id)},
                'username': 'login'
            }
          }))
        // function(accessToken, refreshToken, profile, cb) {
        //     return cb(null, profile)
        // }))

        passport.authenticate('42')
    }

    /* 
        This is the redirect URL the OAuth2 Provider will call
    */
    @Get(':callback')
    callback(@Res() res: Response) {

        res.send(200)
        // var passport = require('passport')

        // passport.authenticate('42', { failureRedirect: '/'}),
        // function(req, res) {
        //     console.log('It worked')
        //     res.redirect('http://localhost:8080/')
        // }
    }

    @Get('status')
    status() {}

}


