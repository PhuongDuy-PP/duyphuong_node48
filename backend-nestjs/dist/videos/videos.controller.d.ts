import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    create(createVideoDto: CreateVideoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVideoDto: UpdateVideoDto): string;
    remove(id: string): string;
}
