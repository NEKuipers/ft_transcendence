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
		// axios.post(`http://localhost:${process.env.PGREST_PORT}/blocked_users`, {
		// 	//TODO ask jesse how to do this properly
		// 	"blocked_by_id": blockedUser.blocked_by_id,
		// 	"blocked_user_id": blockedUser.blocked_user_id,})
		// 		.then(res => console.log(res))
		// 		.catch(err => err);
		console.log(`user ${blockedUser.blocked_user_id} blocked by ${blockedUser.blocked_by_id}`);
		return "success";
	}

	unblockUser(blockedUser: BlockedUser): string {
		// axios.delete(`http://localhost:${process.env.PGREST_PORT}/blocked_users`, {
		// 	//TODO ask jesse how to do this properly
		// 	"blocked_by_id": blockedUser.blocked_by_id,
		// 	"blocked_user_id": blockedUser.blocked_user_id,})
		// 		.then(res => console.log(res))
		// 		.catch(err => console.log(err));\
		console.log(`user ${blockedUser.blocked_by_id} unblocked user ${blockedUser.blocked_user_id}`)
		return "success";

	}
}
