import { Injectable } from '@nestjs/common';
import { AvatarReponse } from './avatars.interface';
import axios from 'axios'

@Injectable()
export class AvatarsService {

	async findOne(id: number): Promise<AvatarReponse|null> {
		try {
			const response = await axios.post(
				`http://localhost:${process.env.PGREST_PORT}/rpc/fnc_get_avatar`,
				{ id: id},
				{
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/octet-stream',
					},
				},
			);
			return {data: response.data, headers: response.headers};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
				return null
			} else {
				console.log('unexpected error: ', error);
				return null
			}
		}
	}
}
