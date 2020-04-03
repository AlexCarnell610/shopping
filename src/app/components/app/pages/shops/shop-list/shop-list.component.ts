import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState, getShopsFromName, SelectShop } from '@appNgrx';
import { Shop } from '@data-models';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ShopService } from '@services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class ShopListComponent implements OnInit {
  public selectedShop: string;
  public selectedShops$: Observable<Shop[]>;
  public addressSelector = new FormControl('Default');
  private addressSelectorValueChange$: Observable<any>;
  private currentShopId$: Observable<number>;

  constructor(
    private store: Store<RootState>,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.selectedShop = this.activatedRoute.snapshot.paramMap.get('shop');
    this.selectedShops$ = this.store.pipe(select(getShopsFromName(), { shopName: this.selectedShop }));
    //use service called currentShop, observable then use forkjoin with value changes somehow?
  }
}
