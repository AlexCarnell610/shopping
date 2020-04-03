import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../reducers';
import * as fromItems from '../reducers/item-reducers';
import { Item } from '@data-models';

export const selectItemState = createFeatureSelector<ItemState>('ItemState');
export const getAllItems = createSelector(selectItemState, fromItems.selectAll);

export const getItemsByName = () =>
  createSelector(getAllItems, (items: Item[], props: { itemNames: string[] }) => {
    return items.filter((item) => props.itemNames.includes(item.name.toLowerCase()));
  });

export const getItemsByNameAndShopID = () =>
  createSelector(getItemsByName(), (items: Item[], props: any) => {
    let shopID = Number(props.shopID);
    let itemsByID = items.filter((item) => item.shops.some((shop) => shop.shopId === shopID));

    return itemsByID;
  });
