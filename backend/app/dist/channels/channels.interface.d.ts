export interface Channel {
    readonly id: number;
    name: string;
    type: number;
    password: string;
    owner_id: number;
    is_closed: boolean;
}
export interface channelName {
    name: string;
}
