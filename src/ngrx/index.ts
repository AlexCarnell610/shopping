import { ShopState } from './reducers/shop-reducers';

export interface RootState {
    ShopState: ShopState
}

export * from './actions/shop-actions';
export * from './effects/shop-effects';
export * from './reducers/index';
export * from './reducers/shop-reducers';
export * from './selectors/shop-selectors';