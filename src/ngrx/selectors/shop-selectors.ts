import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState, selectAll } from '../reducers/shop-reducers';
import { SHOP_STATE } from '@appNgrx'
 
export const selectShopState = createFeatureSelector<ShopState>('[State]Shops');

export const getShops = createSelector(
    selectShopState,
    selectAll
)