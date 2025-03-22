import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    create(createVideoDto: CreateVideoDto): Promise<{
        video_name: string;
        thumbnail: string | null;
        description: string | null;
        views: number | null;
        source: string | null;
        user_id: number | null;
        video_id: number;
        type_id: number | null;
        created_at: Date | null;
    }>;
    findAll(res: Response, page: number, size: number, videoName: string): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): string;
    update(id: string, updateVideoDto: UpdateVideoDto): string;
    remove(id: string): string;
    getParams(req: Request, id: string, name: string, token: string, body: any, res: Response): Response<any, Record<string, any>>;
    uploadThumnail(file: Express.Multer.File, res: Response): any;
    uploadMultipleThumbnail(files: Express.Multer.File[], res: Response): Response<any, Record<string, any>>;
}
