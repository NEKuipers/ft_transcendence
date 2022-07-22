import { Controller, Get, Param } from '@nestjs/common';
import { Profile } from './profile.interface'
import { ProfileService } from './profile.service'


@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get()
	getAllProfiles(): Promise<Profile[]> {
		return this.profileService.getAllProfiles();
	}

	@Get(':id')
	getOneProfile(@Param('id') user_id: number): Promise<Profile> {
		return this.profileService.getOneProfile(user_id);
	}
}
