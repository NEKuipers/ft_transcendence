import { Strategy } from 'passport-42'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { profile } from 'console'

@Injectable()
export class intraStrategy extends PassportStrategy(Strategy) {
    constructor() {
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

    async validate(accessToken: string, refreshToken: string, userProfile: any) {
        const { username, id } = userProfile;
        console.log('Diogane sono io:', username, id)
    }
}