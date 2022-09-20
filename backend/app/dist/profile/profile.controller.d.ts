import { Profile } from './profile.interface';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getAllProfiles(): Promise<Profile[]>;
    getOneProfile(user_id: number): Promise<Profile>;
}
