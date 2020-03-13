import * as fromShop from './shop-reducers';
import { ActionReducerMap } from '@ngrx/store';
import { RootState } from '..';

export const reducers: ActionReducerMap<RootState> = {
    ShopState: fromShop.shopReducer
}

