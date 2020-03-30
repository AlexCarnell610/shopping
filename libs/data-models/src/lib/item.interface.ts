export interface Item {
  id: number;
  name: string;
  shops: ItemShop[];
}

export interface ItemShop {
  shopId: number;
  aisle: number;
}
