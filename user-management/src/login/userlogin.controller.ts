import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserLoginService } from './userlogin.service';
import { UserLoginDto } from './dto/userlogin.dto';

@Controller('auth')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService) {}

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const result = await this.userLoginService.login(body);
    if (!result) {
      throw new UnauthorizedException('Invalid email');
    }
    return result; // Contains: { user: {...}, access_token: '...' }
  }
}
