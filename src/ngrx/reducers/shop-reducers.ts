import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShopActions, ShopActionsEnum } from '../actions/shop-actions';
import { Shop } from '@data-models';

export interface ShopState extends EntityState<Shop> { }

export const adapter: EntityAdapter<Shop> = createEntityAdapter<Shop>();


export const initialShopState: ShopState = adapter.getInitialState();

export function shopReducer(
    state = initialShopState,
    action: ShopActions
): ShopState {
    switch (action.type) {
        case ShopActionsEnum.LOAD_SHOPS_SUCCESS:
            return adapter.addAll(action.payload, state);
            
        case ShopActionsEnum.LOAD_SHOPS:
            return state;
        // case ShopActionsEnum.UPDATE_SHOP:
        //     return adapter.updateOne(action.payload, state)

        default: {
            return state;
        }
    }
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();
