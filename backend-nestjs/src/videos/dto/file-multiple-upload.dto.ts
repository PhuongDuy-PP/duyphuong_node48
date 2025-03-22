import { ApiProperty } from "@nestjs/swagger";

export class FilesUploadDto {
    @ApiProperty({type: 'array', items: {type: 'string', format: 'binary'}})
    thumbnails: Express.Multer.File[];
}