import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
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
}
