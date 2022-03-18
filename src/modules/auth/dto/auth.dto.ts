import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "email@email.com",
        description: "A unique email.",
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "my_password",
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "John Doe",
    })
    name: string;

    @IsOptional()
    @ApiProperty({
        type: String,
        description: "A url where the file is hosted",
    })
    picture?: string;
}
