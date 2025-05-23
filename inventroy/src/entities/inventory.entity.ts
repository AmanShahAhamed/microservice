import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../common/customeBase.entity';

@Entity()
export class Inventory extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 0, nullable: true })
  stock?: number;

  @Column({ type: 'boolean', default: true })
  status?: number;
}
