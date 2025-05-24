import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserLoginModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,UserLoginModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET, // Same secret must be used everywhere
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}  
