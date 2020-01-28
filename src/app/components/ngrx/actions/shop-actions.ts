import { Action } from '@ngrx/store';

enum ShopActionTypes {
    LOAD_SHOPS = '[Shop] Load Shops',
    LOAD_SHOPS_FAIL = '[Shop] Load Shops Fail',
    LOAD_SHOPS_SUCCESS = '[Shop] Load Shops Success'
}

export class LoadShops implements Action {
    readonly type = ShopActionTypes.LOAD_SHOPS;
}

export class LoadShopsFail implements Action {
    readonly type = ShopActionTypes.LOAD_SHOPS_FAIL;
    constructor(public payload: any) {};
}

export class LoadShopsSuccess implements Action {
    readonly type = ShopActionTypes.LOAD_SHOPS_SUCCESS;
    constructor(public payload: string){}
}