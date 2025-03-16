import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query, Header, Headers, HttpStatus } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { ApiQuery } from '@nestjs/swagger';

// http://localhost:3000/videos

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return await this.videosService.create(createVideoDto);
  }

  @Get("/get-all")
  @ApiQuery({name: "page", required: false, type: Number})
  @ApiQuery({name: "size", required: false, type: Number})
  @ApiQuery({name: "video_name", required: false, type: String})
  async findAll(
    @Res() res: Response,
    @Query("page") page: number, // mặc dù define là number nhưng swagger hiểu value là string
    @Query("size") size: number,
    @Query("video_name") videoName: string
  ) {
    try {
      // convert string của page và size sang number
      const formatPage = page ? Number(page): 1;
      const formatSize = size ? Number(size): 10;
      let videos = await this.videosService.findAll(formatPage, formatSize, videoName);
      return res.status(HttpStatus.OK).json({videos});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
    
  }

  // http://localhost:3000/videos/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }


  // GET param, query
  @Post("/get-params/:id")
  getParams(
    @Req() req: Request,
    @Param('id') id: string,
    @Query('name') name: string,
    @Headers('token') token: string,
    @Body() body: any,
    @Res() res: Response
  ) {
    // khuyên: nên dùng của nestjs thay vì dùng của Express
    console.log(req.params);
    const idExpress = req.params.id;
    return res.status(200).json({id, idExpress, name, token, body});
  }
}
