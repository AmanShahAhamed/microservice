import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'inventory-service',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
