import { Controller, Get, Param, Res, Header, Post, Body } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Avatar } from './avatars.interface'
import { Response } from 'express';


@Controller('avatars')
export class AvatarsController {
	constructor(private readonly avatarsService: AvatarsService) {}

	@Get(':id')
	async findOne(@Param('id') id: number, @Res() res: Response) {
		const { data, headers } = await this.avatarsService.findOne(id)
		res.writeHead(200, {
			'Content-Type': headers['content-type'],
			'Content-Disposition': headers['content-disposition'],
			'Content-Length': data.length
		})
		return res.end(Buffer.from(data, 'binary'))
	}

	@Post()
	async newAvatar(@Body() image: Avatar) {
		console.log('Image details in backend', image)
	}

}
