import { Injectable } from '@nestjs/common';
import { BlockedUser, BlockedUserVW } from './blocked_users.interface';

@Injectable()
export class BlockedUsersService {

	findAllForUser(id: number) : BlockedUserVW[] {
		let blocked_by_user_list: BlockedUserVW[] = [];
		//testvariable below
		if (id == 3)
		{
			blocked_by_user_list.push( {
				user_id: 3,
				blocked_user_id: 2,
				blocked_user_name: "tmullan",
			})
		}
		//blocked_by_user_list = Database request to vw_blocked_users with user_id: id param
		return blocked_by_user_list;
	}
}
