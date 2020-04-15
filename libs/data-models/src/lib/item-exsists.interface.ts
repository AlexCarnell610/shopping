import { Item } from './item.interface';

export interface ItemExistsReturn {
    exists: boolean;
    item?: Item;
  }