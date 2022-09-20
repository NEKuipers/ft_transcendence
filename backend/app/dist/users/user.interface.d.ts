declare enum user_status {
    online = 0,
    offline = 1,
    ingame = 2
}
export interface User {
    readonly id: number;
    username: string;
    status: user_status;
    oauth_refresh_token: string;
    oauth_token_expiration_timestamp: string;
    gamesPlayed?: number;
    gamesWon?: number;
    gamesLost?: number;
    isLoggedIn: boolean;
    leaderboardPosition?: number;
    firstLogin: boolean;
}
export interface newUsername {
    username: string;
}
export interface newAvatar {
    avatar_id: number;
}
export {};
