import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserDetailService } from './userdetail.service';
import { JwtTokenGuard } from './JwtAuthGuard';

@Controller('user')
export class UserDetailController {
  constructor(private readonly userService: UserDetailService) {}

  @Get('profile')
  @UseGuards(JwtTokenGuard)
  async getProfile(@Request() req) {
    const userFromToken = req.user; // contains email, userId, etc.
    return {
      message: 'User profile from token',
      profile: userFromToken,
    };
  }
} 