import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { MailService } from '../receiveotp/MailService';


@Injectable()
export class ResetPasswordService {
    constructor(
        @InjectRepository(User)
        private servicepassword: Repository<User>,
        private readonly mailService: MailService,){}

         async sendOtp(email: string): Promise<void> {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await this.mailService.sendOtpEmail(email, otp);
        }
    
}


        