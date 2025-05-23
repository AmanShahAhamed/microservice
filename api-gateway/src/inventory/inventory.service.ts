/* eslint-disable prettier/prettier */
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { Client, ClientProxy, Transport } from '@nestjs/microservices';
// import { CreateInventoryDto } from './dto/create-inventory.dto';
// import { UpdateInventoryDto } from './dto/update-inventory.dto';
// import { firstValueFrom } from 'rxjs';

// @Controller('inventory')
// export class InventoryController {
//   @Client({
//     transport: Transport.TCP,
//     options: {
//       host: 'inventory-service', // match docker-compose service name
//       port: 8877,
//     },
//   })
//   private client: ClientProxy;

//   @Post()
//   async create(@Body() createInventoryDto: CreateInventoryDto) {
//     return firstValueFrom(
//       this.client.send({ cmd: 'inventory_create' }, createInventoryDto)
//     );
//   }

//   @Get()
//   async findAll() {
//     return firstValueFrom(
//       this.client.send({ cmd: 'inventory_find_all' }, {})
//     );
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return firstValueFrom(
//       this.client.send({ cmd: 'inventory_find_one' }, { id: +id })
//     );
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
//     return firstValueFrom(
//       this.client.send({ cmd: 'inventory_update' }, { id: +id, updateInventoryDto })
//     );
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return firstValueFrom(
//       this.client.send({ cmd: 'inventory_remove' }, { id: +id })
//     );
//   }
// }
