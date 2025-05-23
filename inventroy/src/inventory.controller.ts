/* eslint-disable prettier/prettier */

import { Controller } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { MessagePattern } from '@nestjs/microservices'; 

@Controller()
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @MessagePattern('inventory_create')
  async create( )  {
   
    
    return   this.service.create( );
    // return {
    //   status: HttpStatus.OK,
    //   message: 'inventory is created successfully',
    //   response: inventory,
    // };
  }
}
