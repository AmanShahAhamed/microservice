// mail/mail.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Store securely
  }

  async sendOtpEmail(to: string, otp: string) {
    const msg = {
      to,
      from: 'amanshah6405@gmail.com', // Must be a verified sender in SendGrid
      subject: 'Your OTP Code', 
      text: `Your OTP code is: ${otp}`,
      html: `<strong>Your OTP code is: ${otp}</strong>`,
    };

    try {
      const response = await sgMail.send(msg);
      
      // Optional: Check SendGrid response status code (e.g., 202 means accepted)
      if (response[0].statusCode === 202) {
        return { success: true, message: 'Email sent successfully' };
      } else {
        return { success: false, message: 'SendGrid did not accept the email' };
      }

    } catch (error) {
      console.error('Error sending email:', error.response?.body || error.message);
      throw new InternalServerErrorException('Failed to send email '+otp);
    }
  }
}
 