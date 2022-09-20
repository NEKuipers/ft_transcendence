import { Friend, FriendRequest } from './friends.interface';
export declare class FriendsService {
    findAllForUser(id: number): Promise<Friend[]>;
    findAllRequestsForUser(id: number): Promise<FriendRequest[]>;
    isFriend(your_id: number, other_id: number): Promise<number>;
    createFriend(from_id: number, other_id: number): Promise<string>;
    acceptRequest(from_id: number, other_id: number): Promise<string>;
    declineRequest(from_id: number, other_id: number): Promise<string>;
    deleteFriend(from_id: number, other_id: number): Promise<string>;
}
