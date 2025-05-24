import { Module } from '@nestjs/common';
import { UserLoginController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
// import { jwtConstants } from 'src/constant/constants';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module'; 
import { jwtConstants } from 'src/constant/constants';

@Module({
  imports: [  
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule
  ],
  controllers: [UserLoginController],
  providers: [AuthService],
})
export class UserLoginModule {}
