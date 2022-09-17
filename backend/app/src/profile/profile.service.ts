import { Injectable } from '@nestjs/common';
import { Profile } from './profile.interface'
import axios from 'axios';

@Injectable()
export class ProfileService {

	getAllProfiles() : Promise<Profile[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_profile`)
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

	getOneProfile(user_id: number) : Promise<Profile> {
		return new Promise((accept, reject) => {
			
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_profile?user_id=eq.${user_id}`)
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
}
