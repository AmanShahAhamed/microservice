import { Body, Controller, Post } from "@nestjs/common";
import { UserCreateDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
   
   constructor(private readonly userService:UserService){}

   @Post()
   createUser(@Body() body:UserCreateDto){
    return this.userService.create(body)
   }

}