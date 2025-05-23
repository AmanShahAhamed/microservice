import { Module } from '@nestjs/common';
import { MailService } from '../receiveotp/MailService';

@Module({
  providers: [MailService],
  exports: [MailService], // 👈 Export it for other modules
}) 
export class MailModule {}
