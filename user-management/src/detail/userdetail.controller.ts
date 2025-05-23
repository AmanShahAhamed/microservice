import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserDetailService } from './userdetail.service';
import { JwtTokenGuard } from './JwtAuthGuard';

@Controller('user')
export class UserDetailController {
  constructor(private readonly userService: UserDetailService) {}

  @Get('profile')
  @UseGuards(JwtTokenGuard)
  async getProfile(@Request() req) {
    return this.userService.getUserProfile(req.user.userId);
  }
} 