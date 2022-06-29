import { Controller, Get, Redirect, Res, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PassportStrategy } from '@nestjs/passport';
import { passport } from 'passport-42'
import { stringify } from 'querystring';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

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
        // console.log('notlol ' + process.env.CLIENT_ID)
        // return this.loginService.returnUri()
        // {url: 'https://api.intra.42.fr/oauth/authorize?client_id=' + process.env.CLIENT_ID 
        //   + '&redirect_uri=' + 'http://localhost:3030/callback' + '&scope=public&state=authstate&response_type=code'}
        // return this.loginService.returnToken()
        // return 'Trying to login yo'
    }

    @Get(':callback')
    callback() {
        var passport = require('passport')

        passport.authenticate('42', { failureRedirect: '/'}),
        function(req, res) {
            console.log('It worked')
            res.redirect('http://localhost:8080/')
        }
    }

}


