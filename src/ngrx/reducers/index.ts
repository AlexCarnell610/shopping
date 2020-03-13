import * as fromShop from './shop-reducers';
import { ActionReducerMap } from '@ngrx/store';

export const reducers: ActionReducerMap<any> = {
    shop: fromShop.shopReducer
}

export * from './shop-reducers'