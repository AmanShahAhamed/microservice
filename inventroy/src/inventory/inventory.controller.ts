import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { InventoryDto, updateInventoryDto } from "./dto/inventory.dto";
import { InventoryService } from "./inventory.service";



@Controller("inventory")
export class InventoryController {
    constructor(private readonly inventoryService : InventoryService){}

    @Get("health")
    healthCheck()
    {
        return this.inventoryService.healthCheck();
    }

    @Post() 
    create(@Body() body: InventoryDto ){
        return this.inventoryService.create(body);
    } 

    @Get("inventorylist")
    findAll(@Req() body: InventoryDto){
       return this.inventoryService.findAll();
    }

    @Post("status")
    changeStatus(@Body() body: updateInventoryDto){
        return this.inventoryService.changeStatus(body.id);
    }

    @Post("update")
    updateInventory(@Body() body: updateInventoryDto){
        return this.inventoryService.updateInventory(body);
    }
}