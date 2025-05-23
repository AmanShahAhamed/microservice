import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './services/inventory.service';
import { Inventory } from './entities/inventory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([Inventory])
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
