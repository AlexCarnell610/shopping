import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState, selectAll } from '../reducers/shop-reducers';
import { SHOP_STATE } from '@appNgrx'
 
export const selectShopState = createFeatureSelector<ShopState>('shopState123');

export const getShops = createSelector(
    selectShopState,
    selectAll, 
    (shopsState, shops) => {
        return {shopsState, shops}
    }
)