import { BlockedUserVW } from './blocked_users.interface';
export declare class BlockedUsersService {
    findAllForUser(id: number): Promise<BlockedUserVW[]>;
    haveYouBlockedUser(your_id: number, other_id: number): Promise<boolean>;
    hasUserBlockedMe(your_id: number, other_id: number): Promise<boolean>;
    getAllWhoBlockedMe(id: number): Promise<number[]>;
    getAllWhoIHaveBlocked(id: number): Promise<number[]>;
    blockUser(from_id: number, other_id: number): string;
    unblockUser(from_id: number, other_id: number): string;
}
