
import { CustomBaseEntity } from "src/common/customeBase.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("inventory")
export class Inventory extends CustomBaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @Column()
    desc: string;

    @Column()
    stock: string;

    @Column()
    price: string;

    @Column()
    active: boolean;

    @Column()
    discount: string;

}