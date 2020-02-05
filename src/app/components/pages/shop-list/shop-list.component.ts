import { Component, OnInit } from '@angular/core';
import { initialState, adapter } from '../../ngrx/reducers/shop-reducers';
import { ShopHttpService } from 'libs/services/src/lib/shop-http.services';

@Component({
    selector: 'shop-list',
    templateUrl: './shop-list.component.html'
})
export class ShopListComponent implements OnInit {

    constructor(private shopService: ShopHttpService){}

    ngOnInit() {
        console.log("Inititial State", initialState);
        console.log("Adapter", adapter);

        this.shopService.getAllShops();
    }
}