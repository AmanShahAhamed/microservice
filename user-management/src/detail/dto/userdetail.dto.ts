import { IsEmpty } from "class-validator";


export class UserDetailDto {
    @IsEmpty()
    name: string;

    @IsEmpty()
    email: string;

}