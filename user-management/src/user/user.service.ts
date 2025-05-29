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

  update(dto: User): Promise<any>{
    return this.userRepository.update(dto.id,dto);
  }

  async create(dto: UserCreateDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already registered with this email.');
    }

    // Hash the password before saving
    const hashedPassword = await this.hashNewPassword(dto.password);

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

  
  async changePassword(email:string, newpassword: string) : Promise<any>{
    const user = await this.userRepository.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');
       
      const decpassword = await this.hashNewPassword(newpassword);
      user.password = decpassword;
      this.userRepository.save(user);
      return {
        "message":"Password change successfully"
      };
  }

  async hashNewPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  
}

