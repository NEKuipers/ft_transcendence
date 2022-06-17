import { Injectable } from '@nestjs/common';
import { Avatar } from './avatars.interface';

@Injectable()
export class AvatarsService {
	avatars: Avatar[];

	findAll(): Avatar[] {
		return this.avatars;
	}

	findOne(id: number): Avatar {
		return this.avatars.find(avatar => avatar.id == id);
	}
}
