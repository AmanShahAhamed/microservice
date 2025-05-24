import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import mail, { MailService } from "@sendgrid/mail";
import { MailerConfig } from "src/config/mailConfig";
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MailerModule.forRootAsync(MailerConfig),
        JwtModule
    ],
    controllers: [UserController],
    providers: [UserService,MailService],
    exports:[UserService,UserService]
})
export class UserModule { } 