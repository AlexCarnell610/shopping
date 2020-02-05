import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects'
import { LoadShops, ShopActionsEnum, LoadShopsSuccess, LoadShopsFail } from '../actions/shop-actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopHttpService } from 'libs/services/src/lib/shop-http.services';

@Injectable({
    providedIn: 'root'
})
export class ShopEffects {
    constructor(private actions$: Actions, private shopService: ShopHttpService){}

    @Effect()
    loadShops$ = this.actions$.pipe(
        ofType<LoadShops>(ShopActionsEnum.LOAD_SHOPS),
        switchMap(() => {
            console.log("Effect triggered");
            
            return this.shopService.getAllShops().pipe(
                map(shops => new LoadShopsSuccess(shops)),
                catchError(error => of(new LoadShopsFail(error)))
            )
        })
    ) 
}