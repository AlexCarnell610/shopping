import { Injectable } from "@angular/core";
import { Actions } from '@ngrx/store';
import { Effect, ofType } from '@ngrx/effects'
import { LoadShops, ShopActionsEnum } from '../actions/shop-actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShopEffects {
    constructor(private actions$: Actions){}

    @Effect()
    loadShops$ = this.actions$.pipe(
        ofType<LoadShops>(ShopActionsEnum.LOAD_SHOPS),
        switchMap(() => {
            return of(123)
        })
    ) 
}