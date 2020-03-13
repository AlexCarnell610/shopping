import { Component, OnInit } from '@angular/core';
import { ShopHttpService } from 'libs/services/src/lib/shop-http.services';
import { Store} from '@ngrx/store';
import { RootState, getShops } from '@appNgrx';

@Component({
    selector: 'shop-list',
    templateUrl: './shop-list.component.html'
})
export class ShopListComponent implements OnInit {

    constructor(private shopService: ShopHttpService, private store: Store<RootState>){}

    ngOnInit() {
        console.error("HELLO?");
        
        this.store.select(getShops).subscribe(shops => {
            console.error("LKASJDLKASD");
            
            console.error("DOES THIS WORK",shops);
            
        })
    }
}