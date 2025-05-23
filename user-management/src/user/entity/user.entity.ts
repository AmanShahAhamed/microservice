import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../common/custom-base.entity';
import { Exclude } from 'class-transformer';

export enum Role {
  Admin,
  User,
}

@Entity('user')
export class User extends CustomBaseEntity {
  @Column()
  name!: string;
 
  @Column()
  @Exclude()
  password!: string;

  @Column()
  email!: string;

  // @Column()
  // otp!: string;


  @Column({ type: 'int' ,default:Role.User,nullable:true})


  role?: number;
}
