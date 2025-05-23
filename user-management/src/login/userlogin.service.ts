import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/userlogin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserLoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: UserLoginDto) {
    // 1. Check if user exists by email
    const user = await this.usersRepository.findOne({
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
}
