import { Injectable } from '@nestjs/common';
import { BlockedUser, BlockedUserVW } from './blocked_users.interface';
import axios from 'axios';
import { request, createServer, IncomingMessage } from "http";

@Injectable()
export class BlockedUsersService {

	findAllForUser(id: number) : Promise<BlockedUserVW[]> {

		return new Promise((accept, reject) => {
			axios.get(`http://localhost:${process.env.PGREST_PORT}/vw_blocked_users?user_id=eq.${id}`)
				.then((response) => {
					if (response.status != 200) {
						console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`)
						reject(response);
						return;
					}
					accept(response.data);
				}).catch((error) => {
					console.log(`Got error: ${error}`)
					reject(error);
				});
		});
	}

	blockUser(blockedUser: BlockedUser) : string {
		// console.log(`making POST request to http://localhost:${process.env.PGREST_PORT}/blocked_users with data: `);
		
		// axios.post(`http://localhost:${process.env.PGREST_PORT}/blocked_users`, {
		// 	"id": 1,
		// 	"blocked_by_id": from_id,
		// 	"blocked_user_id": to_id,
		// })



		return "success";
	}

	// unblockUser(id: number): BlockedUser {
// 
	// }
}
