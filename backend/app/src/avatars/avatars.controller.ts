import { Controller, Get, Param, Res, Header } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Response } from 'express';


@Controller('avatars')
export class AvatarsController {
	constructor(private readonly avatarsService: AvatarsService) {}

	@Get(':id')
	async findOne(@Param('id') id: number, @Res() res: Response) {
		const { data, headers } = await this.avatarsService.findOne(id)
		let bytes = atob(data)
		res.writeHead(200, {
			'Content-Type': headers['content-type'],
			'Content-Disposition': 'inline; filename="filename.jpg"',
			'Content-Length': bytes.length
		})
		return res.end(Buffer.from(bytes, 'binary'))
	}
}
