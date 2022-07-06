import { Strategy } from 'passport-42'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { profile } from 'console'
import { Config } from 'prettier';
import { LoginService } from '../login.service'
import { callbackify } from 'util';

@Injectable()
export class intraStrategy extends PassportStrategy(Strategy) {
    constructor(
        // private readonly configService: ConfigServicew
        private readonly loginService: LoginService
    ) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            profileFields: {
                'id': function(obj) {
                    return String(obj.id)
                },
                username: 'login'
            }
        })
    }

    async validate(accessToken: string, refreshToken: string, 
        userProfile: any, callback: (error: any, user: any) => void) {
        const { username, id } = userProfile;
        console.log('Diogane sono io:', username, id)
        const details = { id, username }
        // return this.loginService.validateUser(details)
        const user = await this.loginService.validateUser(details)
        callback(null, { id: user.id } )
    }
}