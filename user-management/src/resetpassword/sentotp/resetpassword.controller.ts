import { Controller, Get, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ResetPasswordService } from './resetpassword.service';
import { JwtTokenGuard } from 'src/detail/JwtAuthGuard';

@Controller('user')
export class ResetPasswordCtrl {
  constructor(private readonly userService: ResetPasswordService) {}

  @Get('resetpassword')
  @UseGuards(JwtTokenGuard)
  async sendOtpToEmail(@Req() req): Promise<{ message: string }> {
    const email = req.user?.email; // JWT payload stored in req.user
    if (!email) {
      throw new BadRequestException('Email not found in token');
    }

    await this.userService.sendOtp(email);

    return {
      message: 'OTP sent to email address.',
    };
  }
}
