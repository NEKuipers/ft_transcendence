import { User } from '../users/user.interface'

export type UserDetails = {
    id: string
    username: string
}

export type Done = (err: Error, user: User) => void;