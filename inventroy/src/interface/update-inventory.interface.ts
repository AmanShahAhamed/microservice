import { ICreateInventory } from './create-inventory.interface';

export interface IUpdateInventory extends Partial<ICreateInventory> {
  id: number;
  status?: boolean;
}
