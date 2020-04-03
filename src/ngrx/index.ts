import { ShopState } from './reducers/shop-reducers';
import { ItemState } from './reducers/item-reducers';

export interface RootState {
  ShopState: ShopState;
  ItemState: ItemState;
}

export * from './effects/shop-effects';
export * from './actions/index';
export * from './reducers/index';
export * from './selectors/index';

