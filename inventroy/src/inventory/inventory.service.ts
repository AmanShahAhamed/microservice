import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Not, Repository } from "typeorm";
import { InventoryDto, updateInventoryDto } from "./dto/inventory.dto";
import { Inventory } from "src/entities/inventory.entity";

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private inventory: Repository<Inventory>,
  ) {}

  healthCheck()
  {
    return {message:"Inventory service is running fine"}
  }

  async create(dto: InventoryDto): Promise<any> {
    try {
      console.log("dto.name =", dto.name);

      // Check for existing inventory
      const existingInventory = await this.inventory.findOne({ where: { name: dto.name } });

      if (existingInventory) {
        console.log("Inventory already exists:", existingInventory.name);
        throw new ConflictException(`Inventory with name '${dto.name}' already exists`);
      }

      const newInventory = this.inventory.create({ ...dto });
      await this.inventory.save(newInventory);

      return {
        message: 'Inventory created successfully',
        data: newInventory,
      };
    } catch (error) {
      // If the error is already an HTTP exception, rethrow it
      if (error instanceof ConflictException) {
        throw error;
      }

      console.error('Inventory creation error:', error);
      throw new InternalServerErrorException('Inventory creation failed');
    }
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventory.find();
  }

  async changeStatus(id: number): Promise<any> {
    // Find the inventory item by name
    const existingInventory = await this.inventory.findOne({ where: { id:id } });

    // Safely check if inventory exists
    if (!existingInventory) {
      console.log("Inventory not exists with name:", id);
      throw new NotFoundException(`Inventory does not exist`);
    }

    // Toggle the active status
    existingInventory.active = !existingInventory.active;

    // Save the updated inventory
    await this.inventory.save(existingInventory);

    return {
      message: 'Inventory status changed',
      name: existingInventory.name,
      newStatus: existingInventory.active,
    };
  }

  async updateInventory(dto: updateInventoryDto): Promise<{message:string,data:Inventory}> {
    const existingInventory = await this.inventory.findOne({ where: { name: dto.name,id:Not(dto.id) } });

    if (!existingInventory) {
      throw new NotFoundException(`Inventory with name '${dto.name}' does not exist`);
    }

    // Merge new values from dto into existingInventory
    Object.assign(existingInventory, dto);

    // Save the updated entity
    const updatedInventory = await this.inventory.save(existingInventory);

    return {
      message: 'Inventory updated successfully',
      data: updatedInventory,
    };
  }
  
}