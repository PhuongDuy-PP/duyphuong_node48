import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class VideosService {
  prisma = new PrismaClient();

  async create(createVideoDto: CreateVideoDto) {
    try {
      return await this.prisma.videos.create({
        data: createVideoDto
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page, size, videoName) {
    try {
      let videos = await this.prisma.videos.findMany({
        skip: (page - 1) * size,
        take: size,
        where: videoName ? {video_name: {contains: videoName}} : {}
      });
      return videos;
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a ${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
