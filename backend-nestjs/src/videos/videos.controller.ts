import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query, Header, Headers, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/upload.service';
import { FileUploadDto } from './dto/file-upload.dto';
import { FilesUploadDto } from './dto/file-multiple-upload.dto';
import { AuthGuard } from '@nestjs/passport';

// http://localhost:3000/videos

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return await this.videosService.create(createVideoDto);
  }

  @Get("/get-all")
  @ApiBearerAuth() // define cho swagger biết cần phải có token
  @UseGuards(AuthGuard('jwt')) // define cho nestjs biết cần phải có token
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "size", required: false, type: Number })
  @ApiQuery({ name: "video_name", required: false, type: String })
  async findAll(
    @Res() res: Response,
    @Query("page") page: number, // mặc dù define là number nhưng swagger hiểu value là string
    @Query("size") size: number,
    @Query("video_name") videoName: string
  ) {
    try {
      // convert string của page và size sang number
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let videos = await this.videosService.findAll(formatPage, formatSize, videoName);
      return res.status(HttpStatus.OK).json({ videos });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
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
    return res.status(200).json({ id, idExpress, name, token, body });
  }

  // define API upload single image
  @Post("/upload-thumbnail")
  @ApiBearerAuth() // define cho swagger biết cần phải có token
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes("multipart/form-data") // define type upload file
  @ApiBody({ type: FileUploadDto, required: true }) // define body trên swagger
  @UseInterceptors(FileInterceptor("thumbnail", { storage: storage("thumbnail") }))
  uploadThumnail( @UploadedFile() file: Express.Multer.File, @Res() res: Response): any {
    return res.status(HttpStatus.OK).json(file);
  }

  // define API upload multiple images
  @Post("/upload-multiple-thumbnail")
  @ApiConsumes("multipart/form-data") // define type upload file
  @ApiBody({ type: FilesUploadDto, required: true }) // define body trên swagger
  @UseInterceptors(FilesInterceptor("thumbnails", 20, { storage: storage("thumbnail") }))
  uploadMultipleThumbnail(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json(files);
  }
}
