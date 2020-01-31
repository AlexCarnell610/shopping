import { Shop } from '@data-models';

export interface RootState {
    shop: Shop,
    loaded: boolean,
    loading: boolean
}