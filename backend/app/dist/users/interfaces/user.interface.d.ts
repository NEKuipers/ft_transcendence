export interface User {
    readonly id: number;
    userName: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    isLoggedIn: boolean;
}
