import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { UserLoginDto } from './dto/userlogin.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { RestPasswordDto } from './dto/resetpassworddto';
import { JwtTokenGuard } from 'src/JwtAuthGuard';


@Controller('auth')
export class UserLoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') //auth/login ki post
  @Public()
  async login(@Body() body: UserLoginDto) {
    const result = await this.authService.login(body);
    if (!result) { 
      throw new UnauthorizedException('Invalid email');
    }
    return result; // Contains: { user: {...}, access_token: '...' }
  }

  @Post('reset/password')
  @Public()
  forgetPassword(@Body() body:ForgetPasswordDto) {
    return this.authService.forgetPassword(body);
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  

}
