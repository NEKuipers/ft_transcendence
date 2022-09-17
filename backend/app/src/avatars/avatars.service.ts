import { Injectable } from '@nestjs/common';
import { AvatarReponse } from './avatars.interface';
import axios from 'axios'

@Injectable()
export class AvatarsService {

	async findOne(id: number): Promise<AvatarReponse|null> {
		try {
			const response = await axios.post(
				`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/rpc/fnc_get_avatar`,
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

	async uploadAvatar(file: Express.Multer.File) {
		// console.log('Service can see the file:', file)

		const buff = file.buffer


		const imgdata = "\\x" + buff.toString("hex")


		const response = await axios.post(
			`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/avatars`,
			{
				img:  imgdata,
				name: file.originalname,
				format: 'img/png'
			},
			{
				headers: {
					'Prefer': "return=representation"
				}
			}
		)
		.then(res => { /* console.log('The database returns', res.data[0].id); */ return res.data[0].id }) // TODO this is just a placeholder
		.catch(err => { console.log(err); return 1 })

		// console.log(response)
		// Make this return the new avatar_id if successful, otherwise a 1 
		return response
	}
}
