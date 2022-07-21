import { User } from '../users/user.interface'

// This is the type used to compress all intra's data
export type IntraUserDetails = {
    intraId: number
    username: string
}

// This is what should be put in the res.user variable
export type UserDetails = {
    id: number
    username: string
}

// This is what is stored in the session, compressed form of UserDetails
export type SerializedUserDetails = {
    id: number
}

export type DeSerializeDone = (err: Error, user: User) => void;
export type SerializeDone = (err: Error, user: SerializedUserDetails) => void;