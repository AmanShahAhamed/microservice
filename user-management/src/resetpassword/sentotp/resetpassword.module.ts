import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/constants';
import { ResetPasswordService } from './resetpassword.service';
import { ResetPasswordCtrl } from './resetpassword.controller';
import { MailService } from '@sendgrid/mail';
import { MailModule } from './mail.module';

@Module({
  imports: [
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
    // exports: [MailService],
    TypeOrmModule.forFeature([User]),
    MailModule  // <-- Make sure this is present!
  ],
  providers: [ResetPasswordService,MailService],
  controllers: [ResetPasswordCtrl],
})
export class ResetPasswordModule {}
