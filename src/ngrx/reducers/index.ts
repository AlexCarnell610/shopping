import * as fromShop from './shop-reducers';
import { ActionReducerMap } from '@ngrx/store';
import { RootState } from '..';

import { ItemState, itemAdapter, initialItemState, itemReducer } from './item-reducers';
export const reducers: ActionReducerMap<RootState> = {
  ShopState: fromShop.shopReducer,
  ItemState: itemReducer,
};

export { ItemState, itemAdapter, initialItemState, itemReducer };
export * from './shop-reducers';
