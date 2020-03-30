import { Component, OnInit } from "@angular/core";
import { Shop } from "@data-models";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { RootState, getShops, getDeDupedShops } from "@appNgrx";
import { FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ShoppingListService } from "libs/services/src/lib/shopping-list.service";

@Component({
  selector: "app-shop-search",
  templateUrl: "./shop-search.component.html",
  styleUrls: ["../../../app.component.css"],
})
export class ShopSearchComponent implements OnInit {
  public showError: boolean = false;
  public shopControl = new FormControl("", Validators.required);
  public shops$: Observable<Shop[]>;

  constructor(
    private store: Store<RootState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private listService: ShoppingListService
  ) {}

  ngOnInit() {
    this.shops$ = this.store.pipe(select(getDeDupedShops()));
  }

  public selectShop() {
    if (this.shopControl.valid) {
      this.router.navigate(["list", this.shopControl.value], {
        relativeTo: this.activatedRoute.parent,
      });
    } else {
      this.showError = true;
    }
  }
}
