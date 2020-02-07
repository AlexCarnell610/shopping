import { Component, OnInit } from '@angular/core';
import { initialState, adapter } from '../../ngrx/reducers/shop-reducers';
import { ShopHttpService } from 'libs/services/src/lib/shop-http.services';
import { Store, State, select } from '@ngrx/store';
import { RootState } from '../../ngrx/root-state';
import { getShops } from '../../ngrx/selectors/shop-selectors';

@Component({
    selector: 'shop-list',
    templateUrl: './shop-list.component.html'
})
export class ShopListComponent implements OnInit {

    constructor(private shopService: ShopHttpService, private store: Store<RootState>){}

    ngOnInit() {
        console.log("Inititial State", initialState);
        console.log("Adapter", adapter);

        // this.store.select(getShops)
        
    }
}