import { Controller, HttpStatus } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { MessagePattern } from '@nestjs/microservices';
import { IResponse } from './interface/response.interface';
import { ICreateInventory } from './interface/create-inventory.interface';
import { Inventory } from './entities/inventory.entity';

@Controller()
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @MessagePattern('inventory_create')
  async create(payload: ICreateInventory): Promise<IResponse<Inventory>> {
    const inventory = await this.service.create(payload);
    return {
      status: HttpStatus.OK,
      message: 'inventory is created successfully',
      response: inventory,
    };
  }
}
