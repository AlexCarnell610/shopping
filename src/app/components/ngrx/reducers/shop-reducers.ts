import { RootState } from "../root-state";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { ShopActionsEnum, ShopActionsType } from "../actions/shop-actions";
import { Shop } from '@data-models';

export interface ShopState extends EntityState<Shop>{
    loading: boolean,
    loaded: boolean
}
export const adapter: EntityAdapter<Shop> = createEntityAdapter<Shop>();
export const initialState: ShopState = adapter.getInitialState({
    loading: false,
    loaded: false
});

export function reducer(action: ShopActionsType, state = initialState): ShopState{

    switch(action.type) {
        case ShopActionsEnum.LOAD_SHOPS: {
            return {
                ...state,
                loading: true
            }
        }
        case ShopActionsEnum.LOAD_SHOPS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            }
        }
        case ShopActionsEnum.LOAD_SHOPS_SUCCESS : {
            
        }
    }

    return
}