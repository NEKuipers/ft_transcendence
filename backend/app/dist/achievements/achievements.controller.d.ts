import { AchievementsService } from 'src/achievements/achievements.service';
import { Achievement } from './achievements.interface';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    findAll(): Promise<Achievement[]>;
    findUserAchievements(id: number): Promise<Achievement[]>;
}
