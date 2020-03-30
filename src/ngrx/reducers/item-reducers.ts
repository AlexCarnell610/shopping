import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { Item } from "@data-models";
import { ItemActions, ItemActionsEnum } from "../actions/item-actions";

export interface ItemState extends EntityState<Item> {}
export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>();
export const initialItemState: ItemState = itemAdapter.getInitialState();

export function itemReducer(
  state = initialItemState,
  action: ItemActions
): ItemState {
  switch (action.type) {
    case ItemActionsEnum.LOAD_ITEMS: {
      return state;
    }
    case ItemActionsEnum.LOAD_ITEMS_SUCCESS: {
      return itemAdapter.addAll(action.payload, state);
    }
    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = itemAdapter.getSelectors();
