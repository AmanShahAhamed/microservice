import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../common/custom-base.entity';

export enum Role {
  Admin,
  User,
}

@Entity('user')
export class User extends CustomBaseEntity {
  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ type: 'int' })
  role!: number;
}
