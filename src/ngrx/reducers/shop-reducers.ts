import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShopActions, ShopActionsEnum } from '../actions/shop-actions';
import { Shop } from '@data-models';
import { Item } from 'libs/data-models/src/lib/item.interface';

export interface ShopState extends EntityState<Shop> {}

export const shopAdapter: EntityAdapter<Shop> = createEntityAdapter<Shop>();

export const initialShopState: ShopState = shopAdapter.getInitialState();

export function shopReducer(state = initialShopState, action: ShopActions): ShopState {
  switch (action.type) {
    case ShopActionsEnum.LOAD_SHOPS_SUCCESS:
      return shopAdapter.addAll(action.payload, state);

    case ShopActionsEnum.LOAD_SHOPS:
      return state;

    case ShopActionsEnum.SELECT_SHOP:
      return shopAdapter.updateOne(action.payload, state);
    case ShopActionsEnum.DESELECT_SHOPS:
      return shopAdapter.updateMany(action.payload, state);
    // case ShopActionsEnum.UPDATE_SHOP:
    //     return adapter.updateOne(action.payload, state)

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = shopAdapter.getSelectors();
