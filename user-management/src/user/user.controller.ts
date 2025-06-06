import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UserCreateDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { JwtTokenGuard } from "src/JwtAuthGuard";
import { Public } from "src/decorator/public.decorator";
import { RestPasswordDto } from "src/auth/dto/resetpassworddto";
import { ChangePasswordDto } from "./dto/changepassworddto";


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

   @Post('changepassword')
   @UseGuards(JwtTokenGuard)
   updatePassword(@Req() req: any,@Body() body:ChangePasswordDto){
      const userEmail = req.user.email;
     return this.userService.changePassword(userEmail,body.password.toString());
   }  
}