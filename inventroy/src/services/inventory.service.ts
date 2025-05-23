import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../entities/inventory.entity';
import { Repository } from 'typeorm';
import { ICreateInventory } from '../interface/create-inventory.interface';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  async create(payload: ICreateInventory): Promise<Inventory> {
    return this.inventoryRepo.save(payload);
  }
}
