import { Strategy } from 'passport-42'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { profile } from 'console'
import { Config } from 'prettier';
import { LoginService } from '../login.service'

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
                username: 'login',
                profileUrl: 'url'
            }
        })
    }

    async validate(accessToken: string, refreshToken: string, userProfile: any) {
        const { username, id, profileUrl } = userProfile;
        console.log('Diogane sono io:', username, id, profileUrl)
        const details = { id, username }
        return this.loginService.validateUser(details)
    }
}