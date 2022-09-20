/// <reference types="multer" />
import { AvatarReponse } from './avatars.interface';
export declare class AvatarsService {
    findOne(id: number): Promise<AvatarReponse | null>;
    uploadAvatar(file: Express.Multer.File): Promise<any>;
}
