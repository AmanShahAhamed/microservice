import { IsEmail, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Role } from '../entity/user.entity';

export class UserCreateDto {
    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(Role)
    role?:Role
    
}