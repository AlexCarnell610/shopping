import { Component, OnInit } from "@angular/core";
import { ShopHttpService } from "libs/services/src/lib/shop-http.services";
import { Store, select } from "@ngrx/store";
import { RootState, getShopsFromName } from "@appNgrx";
import { Shop } from "@data-models";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";

@Component({
  selector: "shop-list",
  templateUrl: "./shop-list.component.html",
  styleUrls: ["../../../app.component.css"],
})
export class ShopListComponent implements OnInit {
  public selectedShop: string;
  public selectedShops$: Observable<Shop[]>;
  public addressSelector = new FormControl("Default");
  constructor(
    private store: Store<RootState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedShop = this.activatedRoute.snapshot.paramMap.get("shop");
    this.selectedShops$ = this.store.pipe(
      select(getShopsFromName(), { shopName: this.selectedShop })
    );
  }

  public selected() {}
}
