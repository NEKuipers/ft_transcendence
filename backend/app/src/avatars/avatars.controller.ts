import { Controller, Get, Param, Res, Req, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';


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
	@UseInterceptors(FileInterceptor('file'))
	async newAvatar(@Req() req: any, @Body() image: any, @UploadedFile() file: Express.Multer.File) {

		this.avatarsService.uploadAvatar(file)
		
	}

}
