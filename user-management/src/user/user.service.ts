import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  
    constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){}

    async create(dto:UserCreateDto){
        const hashPassed = await bcrypt.hash(dto.password, 10);
        return await this.userRepo.save({...dto,password:hashPassed})
    }
    
}