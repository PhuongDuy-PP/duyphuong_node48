import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaClient } from '@prisma/client';
export declare class VideosService {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
    findAll(page: any, size: any, videoName: any): Promise<{
        video_name: string;
        thumbnail: string | null;
        description: string | null;
        views: number | null;
        source: string | null;
        user_id: number | null;
        video_id: number;
        type_id: number | null;
        created_at: Date | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateVideoDto: UpdateVideoDto): string;
    remove(id: number): string;
}
