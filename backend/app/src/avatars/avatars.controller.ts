import { Controller, Get, Post, Patch, Delete, Body, Param, UploadedFile } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Avatar } from './avatars.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';


@Controller('avatars')
export class AvatarsController {
	constructor(private readonly avatarsService: AvatarsService) {}

	@Get()
	findAll(): Avatar[] {
		return this.avatarsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number): Avatar { 
		return this.avatarsService.findOne(id);
	}

	@Get('default')
	returnDefault(): string {
		return this.avatarsService.returnDefault();
	}

	@Post('upload') //Might need to make this async?
	@UseInterceptors(FileInterceptor('file', {dest:'./src/avatars/assets/upload'}))
	uploadFile(@UploadedFile() file: Express.Multer.File): string {
		this.avatarsService.setAvatar(file);
		return `${file.originalname} received`;
	}
}
