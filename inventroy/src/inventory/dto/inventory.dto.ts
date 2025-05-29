import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class InventoryDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    desc: string;

    @IsNotEmpty()
    stock: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    active: boolean;

    @IsNotEmpty()
    discount: string;

}


export class updateInventoryDto {
    @IsNumber()
    id: number;

    @IsOptional()
    name?: string;

    @IsOptional()
    desc?: string;

    @IsOptional()
    stock?: string;

    @IsOptional()
    price?: string;

    @IsOptional()
    discount?: string;

    
}
