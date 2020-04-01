import { Action } from "@ngrx/store";
import { Item } from "@data-models";

export enum ItemActionsEnum {
  LOAD_ITEMS = "[Item] Load Items",
  LOAD_ITEMS_FAIL = "[Item] Load Items Fail",
  LOAD_ITEMS_SUCCESS = "[Item] Load Items Success",
  UPDATE_Item = "[Item] Update Item",
  ADD_ITEM = "[Item] Add Item",
}

export class LoadItems implements Action {
  readonly type = ItemActionsEnum.LOAD_ITEMS;
}

export class LoadItemsFail implements Action {
  readonly type = ItemActionsEnum.LOAD_ITEMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemActionsEnum.LOAD_ITEMS_SUCCESS;
  constructor(public payload: Item[]) {}
}

export class UpdateItem implements Action {
  readonly type = ItemActionsEnum.UPDATE_Item;
  constructor(public payload: Item) {}
}

export class AddItem implements Action {
  readonly type = ItemActionsEnum.ADD_ITEM;
  constructor(public payload: Item) {}
}

export type ItemActions =
  | LoadItems
  | LoadItemsFail
  | LoadItemsSuccess
  | UpdateItem
  | AddItem;
