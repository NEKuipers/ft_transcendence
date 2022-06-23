import { Injectable } from '@nestjs/common';
import { Avatar } from './avatars.interface';

@Injectable()
export class AvatarsService {
	avatars: Avatar[] = [];

	returnDefault(): string {
		return `http://localhost:3030/avatars/assets/default.png`
	}

	setAvatar(file: Express.Multer.File) {
		this.avatars.push({id: this.avatars.length + 1, file: file});
	}

	findAll(): Avatar[] {
		return this.avatars;
	}

	findOne(id: number): Avatar {
		return this.avatars.find(avatar => avatar.id == id);
	}
}
