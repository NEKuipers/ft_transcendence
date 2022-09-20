import { Achievement } from './achievements.interface';
export declare class AchievementsService {
    constructor();
    findAll(): Promise<Achievement[]>;
    findUserAchievements(id: number): Promise<Achievement[]>;
}
