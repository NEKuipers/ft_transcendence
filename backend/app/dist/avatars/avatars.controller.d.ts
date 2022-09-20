/// <reference types="multer" />
import { AvatarsService } from './avatars.service';
import { Response } from 'express';
export declare class AvatarsController {
    private readonly avatarsService;
    constructor(avatarsService: AvatarsService);
    findOne(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    newAvatar(res: Response, req: any, image: any, file: Express.Multer.File): Promise<void>;
}
