import { ShopState } from './reducers/shop-reducers';


export const SHOP_STATE = '[State]Shops';

export interface RootState {
    ShopState: ShopState
}

export * from './actions/shop-actions';
export * from './effects/shop-effects';
export * from './reducers/index';
export * from './reducers/shop-reducers';
export * from './selectors/shop-selectors';