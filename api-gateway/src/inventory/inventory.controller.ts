import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'inventory-service',
        port: 3001,
      },
    });
  }

  @Post()
  async create(@Body() body: CreateInventoryDto) {
    //console.log({ body });

    return await firstValueFrom(this.client.send('inventory_create', body));
  }
}
