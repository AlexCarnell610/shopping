import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ShopState, selectAll } from "../reducers/shop-reducers";
import * as fromShops from "../reducers/shop-reducers";
import { Shop } from "@data-models";

export const selectShopState = createFeatureSelector<ShopState>("ShopState");

export const getShops = createSelector(selectShopState, fromShops.selectAll);

export const getShopsFromName = () =>
  createSelector(getShops, (shops: Shop[], props: {shopName: string} ) => {
      return shops.filter(shop => shop.name === props.shopName)
  });

export const getDeDupedShops = () =>
  createSelector(getShops, (shops: Shop[]) => {
    return myReducer(shops);
  });

const myReducer = (
  shopArray: Shop[],
  accumulator: Shop[] = [],
  names: string[] = []
) => {
  while (shopArray.length - 1 > 0) {
    let length = shopArray.length - 1;
    let currentName = shopArray[length].name.toLowerCase();
    if (!names.includes(currentName)) {
      accumulator.push(shopArray[length]);
      names.push(currentName);
      shopArray.pop();
      myReducer(shopArray, accumulator, names);
    } else {
      shopArray.pop();
      myReducer(shopArray, accumulator, names);
    }
  }
  return accumulator;
};
