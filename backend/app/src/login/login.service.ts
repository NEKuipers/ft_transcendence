import { Injectable } from '@nestjs/common';
import { IntraUserDetails, UserDetails } from './login.types'
import { UsersService } from '../users/users.service';
import { User } from '../users/user.interface'

@Injectable()
export class LoginService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(details: IntraUserDetails): Promise<User> {
		// console.log("Validating user: ", details);
        
		// TODO: Find by intra id, This is currently searching for a user by the intra-username, even though you can change your username
		const userDb = await await this.userService.findOneByName(details.username)
        if (userDb) {
            // console.log('Found user', userDb.username, details.intraId)
            return userDb
        }
        else {
            /* There has got be a better place to do this, right? Or perhaps not */
            const username = details.username
            const status = 'online'
            const avatar_id = 1
			const intra_id = details.intraId;
            const oauth_refresh_token = 'Chill'
            const oauth_token_expiration_time = '2020-07-20 11:44:34'
            const is_logged_in = true
            const CreateUserDto = { username, status, avatar_id, oauth_refresh_token, intra_id, oauth_token_expiration_time, is_logged_in }
            return await this.userService.createUser(CreateUserDto)
        }
    }
}
