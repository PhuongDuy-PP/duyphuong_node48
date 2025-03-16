import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty({message: "Video name không được để trống"})
    @ApiProperty() // show attribute ra ngoài giao diện swagger
    video_name: string;

    @IsNotEmpty({message: "Thumbnail không được để trống"})
    @ApiProperty()
    thumbnail: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    views: number;

    @ApiProperty()
    source: string;

    user_id: number;
}
