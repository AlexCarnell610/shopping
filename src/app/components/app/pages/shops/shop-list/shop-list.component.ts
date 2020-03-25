import { Component, OnInit } from '@angular/core';
import { ShopHttpService } from 'libs/services/src/lib/shop-http.services';
import { Store, select } from '@ngrx/store';
import {
	RootState,
	getShops,
	selectShopState,
	selectAll,
	getShopsFromName
} from '@appNgrx';
import { Shop } from '@data-models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'shop-list',
	templateUrl: './shop-list.component.html'
})
export class ShopListComponent implements OnInit {
	public selectedShop: string;
	public selectedShops: Observable<Shop[]>;
	constructor(
		private store: Store<RootState>,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.selectedShop = this.activatedRoute.snapshot.paramMap.get('shop');
		this.store
			.pipe(select(getShopsFromName(), { shopName: this.selectedShop }))
			.subscribe(shops => console.error(shops));
	}
}
