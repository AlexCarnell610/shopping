import { Shop } from '@data-models';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum ShopActionsEnum {
  LOAD_SHOPS = '[Shop] Load Shops',
  LOAD_SHOPS_FAIL = '[Shop] Load Shops Fail',
  LOAD_SHOPS_SUCCESS = '[Shop] Load Shops Success',
  UPDATE_SHOP = '[Shop] Update Shop',
  SELECT_SHOP = '[Shop] Select Shop',
  DESELECT_SHOPS = '[Shop] DeSelect Shops',
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

export class SelectShop implements Action {
  readonly type = ShopActionsEnum.SELECT_SHOP;
  constructor(public payload: Update<Shop>) {}
}

export class DeSelectShops implements Action {
  readonly type = ShopActionsEnum.DESELECT_SHOPS;
  constructor(public payload: Update<Shop>[]) {}
}

export type ShopActions = LoadShops | LoadShopsFail | LoadShopsSuccess | UpdateShop | SelectShop | DeSelectShops;
