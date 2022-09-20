import { BlockedUsersService } from './blocked_users.service';
import { BlockedUserVW } from './blocked_users.interface';
export declare class BlockedUsersController {
    private readonly blockedUsersService;
    constructor(blockedUsersService: BlockedUsersService);
    findAllForUser(id: number): Promise<BlockedUserVW[]>;
    haveYouBlockedUser(your_id: number, other_id: number): Promise<boolean>;
    hasUserBlockedMe(your_id: number, other_id: number): Promise<boolean>;
    getAllWhoBlockedMe(id: number): Promise<number[]>;
    getAllWhoIHaveBlocked(id: number): Promise<number[]>;
    blockUser(req: any, other: any): string;
    unblockUser(req: any, other: any): string;
}
