import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserLoginModule } from './login/userlogin.module';
import { UserModule } from './user/user.module';
import { UserDetailModule } from './detail/userdetail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,UserLoginModule, UserDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
