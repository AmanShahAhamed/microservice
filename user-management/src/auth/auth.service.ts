import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userlogin.dto';
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { UserService } from 'src/user/user.service';
import { generateOTP } from './utils/utils.fn';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/entity/user.entity';
import { RestPasswordDto } from './dto/resetpassworddto';

@Injectable()
export class AuthService {
  constructor(
   private readonly userService:UserService,
   private readonly mailService:MailerService,
   private readonly  jwtService: JwtService,
  ) {}

  async login(dto: UserLoginDto) {
    // 1. Check if user exists by email
    const user = await this.userService.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid emails or password');
    }

    // 2. Check password securely
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or passwords ');
    }

    // 3. Create JWT payload
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      id: user.id, // Return user id if needed
      access_token: token,
    };
  }

  private  sendMails(email:string, otp: string) {
    return this.mailService.sendMail({
      from: 'sunilkabackup@gmail.com',
      to: email,
      subject: `Otp message`,
      text: 'this one is your otp '+otp,
    });
  }


  async forgetPassword(forgetPasswordDto:ForgetPasswordDto) {
    const {email}=forgetPasswordDto;
    const user=await this.userService.findOne({where:{email}});
    if(!user) throw new BadRequestException({message:"user not registered"});
    //otp
    user.otp=generateOTP();
    await this.userService.save([user]);
    this.sendMails(email,user.otp);
    return {message:"Otp send successfully to email"}
  }

  async updatePassword(resetpassword: RestPasswordDto){
    const email = resetpassword.email; 
    const otp = resetpassword.otp;
    const password = resetpassword.password;
    const users = await this.userService.findOne({where:{email}});
    if(!users){
      throw new NotFoundException({message:"user not exist"})
    }
    if(users.otp!==otp)
      throw new BadRequestException({message:"Your otp has expired or invalid"});
    
    users.password = await bcrypt.hash(users.password, 10);
    users.otp = "";
    await this.userService.update( users);

    return {message:"Otp updated successfully"};
  }

  
  
}
