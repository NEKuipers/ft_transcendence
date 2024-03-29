import { Strategy } from 'passport-42'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { LoginService } from '../login.service'

@Injectable()
export class intraStrategy extends PassportStrategy(Strategy) {
    constructor(
        // private readonly configService: ConfigServicew
        private readonly loginService: LoginService,
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

        const details = { intraId: id, username }
        const user = await this.loginService.validateUser({
			intraId: userProfile.id,
			username: userProfile.username,
			oauth_refresh_token: refreshToken,
			oauth_token_expiration_time: '2020-07-20 11:44:34'
		});

        callback(null, user)
    }
}