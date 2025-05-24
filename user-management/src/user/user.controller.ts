import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserCreateDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { JwtTokenGuard } from "src/JwtAuthGuard";
import { Public } from "src/decorator/public.decorator";

 @Public()
@Controller('user')
export class UserController { 
   
   constructor(private readonly userService:UserService){}

   @Post()
   createUser(@Body() body:UserCreateDto) {
    return this.userService.create(body)
   }

   @Get('profile')
   @UseGuards(JwtTokenGuard)
   async getProfile(@Request() req:any) { 
      const userdata = req.user; // contains email, userId, etc.
      return { 
      message: 'User profile from token',
      profile: userdata,
      };
   }

}