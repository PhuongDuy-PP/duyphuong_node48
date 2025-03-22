import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty({type: 'string', format: 'binary'})
    thumbnail: Express.Multer.File;
}