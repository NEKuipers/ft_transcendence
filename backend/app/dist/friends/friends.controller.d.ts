import { FriendsService } from './friends.service';
import { Friend, FriendRequest } from './friends.interface';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    findAllForUser(id: number): Promise<Friend[]>;
    findAllRequestsForUser(id: number): Promise<FriendRequest[]>;
    isFriend(your_id: number, other_id: number): Promise<number>;
    create(req: any, other_id: any): Promise<string>;
    declineRequest(req: any, other_id: any): Promise<string>;
    acceptRequest(req: any, other_id: any): Promise<string>;
    unfriend(req: any, other_id: any): Promise<string>;
}
