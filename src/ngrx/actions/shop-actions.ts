import { Shop } from "@data-models";
import { Action } from "@ngrx/store";

export enum ShopActionsEnum {
  LOAD_SHOPS = "[Shop] Load Shops",
  LOAD_SHOPS_FAIL = "[Shop] Load Shops Fail",
  LOAD_SHOPS_SUCCESS = "[Shop] Load Shops Success",
  UPDATE_SHOP = "[Shop] Update Shop",
}

export class LoadShops implements Action {
  readonly type = ShopActionsEnum.LOAD_SHOPS;
}

export class LoadShopsFail implements Action {
  readonly type = ShopActionsEnum.LOAD_SHOPS_FAIL;
  constructor(public payload: any) {}
}

export class LoadShopsSuccess implements Action {
  readonly type = ShopActionsEnum.LOAD_SHOPS_SUCCESS;
  constructor(public payload: Shop[]) {}
}

export class UpdateShop implements Action {
  readonly type = ShopActionsEnum.UPDATE_SHOP;
  constructor(public payload: Shop) {}
}

export type ShopActions =
  | LoadShops
  | LoadShopsFail
  | LoadShopsSuccess
  | UpdateShop;
