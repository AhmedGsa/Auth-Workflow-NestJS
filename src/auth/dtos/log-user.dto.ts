import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}