import { IsEmail, IsEmpty, IsNotEmpty, MinLength } from "class-validator";
import { Column } from "typeorm";

export class RestPasswordDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @MinLength(6)
    otp: string;

}