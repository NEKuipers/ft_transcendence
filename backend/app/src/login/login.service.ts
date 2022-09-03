import { Injectable } from '@nestjs/common';
import { IntraUserDetails, UserDetails } from './login.types'
import { UsersService } from '../users/users.service';
import { User } from '../users/user.interface'

@Injectable()
export class LoginService {
	constructor(private readonly userService: UsersService) {}

	async validateUser(details: IntraUserDetails): Promise<User> {
		let userDb = await this.userService.findOneIntra(details.intraId)
		if (userDb) {
			userDb.firstLogin = false;
			return userDb
		}

		/* There has got be a better place to do this, right? Or perhaps not */
		let newUserDb = await this.userService.createUser({
			username: details.username,
			status: 'online',
			avatar_id: 1,
			oauth_refresh_token: details.oauth_refresh_token,
			oauth_token_expiration_time: details.oauth_token_expiration_time,
			intra_id: details.intraId,
			is_logged_in: true
		})
		newUserDb.firstLogin = true;
		return newUserDb;
    }
}
