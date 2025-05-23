import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserDetailService } from './userdetail.service';
import { UserDetailController } from './userdetail.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/constants';

@Module({
  imports: [  JwtModule.register({
        secret: jwtConstants.secret,
     //   signOptions: { expiresIn: '1d' },
      }),
    TypeOrmModule.forFeature([User]),  // <-- Make sure this is present!
  ],
  providers: [UserDetailService],
  controllers: [UserDetailController],
})
export class UserDetailModule {}
