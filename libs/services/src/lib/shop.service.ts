import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    private _currentShopId$: BehaviorSubject<number> = new BehaviorSubject(0);

    set currentShopId(id: number) {
        this._currentShopId$.next(id);
    }

    get currentShopId(){
        return this._currentShopId$.getValue();
    }

    get currentShopId$(){
        return this._currentShopId$.asObservable();
    }
}