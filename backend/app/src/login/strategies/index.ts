import { Strategy } from 'passport-42'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
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
                username: 'login'
            }
        })
    }

    async validate(accessToken: string, refreshToken: string, 
        userProfile: any, callback: (error: any, user: any) => void) {
        const { id, username } = userProfile;
        console.log('Diogane sono io:', username)
        const details = { id, username }
        const user = await this.loginService.validateUser(details)
        console.log('access token', accessToken, 'refresh token', refreshToken)
        callback(null, { id: user.id } )
    }
}