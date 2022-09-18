import { Controller, Get, Param, Res, Req, Post, Body, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { TFAGuard } from '../two_factor_auth/tfa.guard';

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
	@UseGuards(TFAGuard)
	@UseInterceptors(FileInterceptor('file'))
	async newAvatar(@Res() res: Response, @Req() req: any, @Body() image: any, @UploadedFile() file: Express.Multer.File) {

		const uploadSuccessful = await this.avatarsService.uploadAvatar(file)
		
		res.send({avatar_id: uploadSuccessful})
	}

}
