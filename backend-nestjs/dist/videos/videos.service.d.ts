import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
export declare class VideosService {
    create(createVideoDto: CreateVideoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVideoDto: UpdateVideoDto): string;
    remove(id: number): string;
}
