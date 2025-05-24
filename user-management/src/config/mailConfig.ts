import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
export const MailerConfig: MailerAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    transport: {
      host: configService.get<string>('MAILER_HOST') ?? 'smtp.gmail.com',
      secure: true,
      auth: {
        user: configService.getOrThrow<string>('EMAIL_USERNAME'),
        pass: configService.getOrThrow<string>('EMAIL_PASSWORD'),
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
  }),
};