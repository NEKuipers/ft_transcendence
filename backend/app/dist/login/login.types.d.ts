import { User } from '../users/user.interface';
export declare type IntraUserDetails = {
    intraId: number;
    username: string;
    oauth_refresh_token: string;
    oauth_token_expiration_time: string;
};
export declare type UserDetails = {
    id: number;
    username: string;
};
export declare type SerializedUserDetails = {
    id: number;
};
export declare type DeSerializeDone = (err: Error, user: User) => void;
export declare type SerializeDone = (err: Error, user: SerializedUserDetails) => void;
