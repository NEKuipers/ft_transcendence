import { Profile } from './profile.interface';
export declare class ProfileService {
    getAllProfiles(): Promise<Profile[]>;
    getOneProfile(user_id: number): Promise<Profile>;
}
