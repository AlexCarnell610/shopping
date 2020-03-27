import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../reducers';
import * as fromItems from '../reducers/item-reducers';
import { Item } from '@data-models';

export const selectItemState = createFeatureSelector<ItemState>('ItemState');
export const getAllItems = createSelector(selectItemState, fromItems.selectAll);

export const getItemsByName = () =>
	createSelector(
		getAllItems,
		(items: Item[], props: { itemNames: string[] }) => {
			return items.filter(item =>
				props.itemNames.includes(item.name.toLowerCase())
			);
		}
	);

export const getItemsByNameAndShopID = () =>
	createSelector(getItemsByName(), (items: Item[], props: any) => {
		let shopID = Number(props.shopID);
		let itemsByID = items.filter(item =>
			item.shops.some(shop => shop.shopId === shopID)
		);
		// console.error('Before', itemsByID);

		for (let i = 0; i < itemsByID.length; i++) {
			let ok =itemsByID[i].shops.filter(
				shop => shop.shopId === shopID
			);
			console.error("FILTERED?", ok);
			
			itemsByID[i].shops = ok;
		}
		// console.error('After', itemsByID);
		return itemsByID;
	});
