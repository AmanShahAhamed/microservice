import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

    find(options?:FindManyOptions<User>){
    return this.userRepository.find(options)
  }

  findOne(options: FindOneOptions<User>){
    return this.userRepository.findOne(options)
  }

  save(entities: DeepPartial<User>[]){
    return this.userRepository.save(entities)
  }

  async create(dto: UserCreateDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already registered with this email.');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    // Don't return the password in the response
    const { password, ...userWithoutPassword } = newUser;

    return {
      message: 'User created successfully',
      user: userWithoutPassword,
    };
  }
 
  async getUserProfileByEmail(email: string) {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');
  
      const { password, createdAt, updatedAt, ...safeUser } = user;
      return safeUser;
    }

}

