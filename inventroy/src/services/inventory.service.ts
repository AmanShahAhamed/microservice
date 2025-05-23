import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm/repository/Repository';

@Controller()
export class InventoryService {
  constructor() {} // private readonly inventoryRepository: Repository<Inventory>, // @InjectRepository(Inventory)

  create() {
    return { message: 'Created inventory' };
  }

  // @MessagePattern({ cmd: 'inventory_find_all' })
  // findAll() {
  //   return ['item1', 'item2'];
  // }

  // @MessagePattern({ cmd: 'inventory_find_one' })
  // findOne(data: { id: number }) {
  //   return { id: data.id, name: 'Test Item' };
  // }

  // @MessagePattern({ cmd: 'inventory_update' })
  // update(data: { id: number; updateInventoryDto: UpdateInventoryDto }) {
  //   return { message: 'Updated inventory', data };
  // }

  // @MessagePattern({ cmd: 'inventory_remove' })
  // remove(data: { id: number }) {
  //   return { message: `Deleted inventory with id ${data.id}` };
  // }
}
