import { Component, OnInit, Input } from "@angular/core";
import { RootState } from "@appNgrx";
import { Store, select } from "@ngrx/store";
import {
  getItemsByNameAndShopID,
  getItemsByName,
} from "src/ngrx/selectors/item-selectors";
import { FormControl } from "@angular/forms";
import { Observable, combineLatest } from "rxjs";
import { Item } from "@data-models";
import { ShoppingListService } from "libs/services/src/lib/shopping-list.service";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-view-results",
  templateUrl: "./view-results.component.html",
  styles: [],
})
export class ViewResultsComponent implements OnInit {
  @Input() addressSelector: FormControl;
  public items$: Observable<Item[]>;
  public currentShopId: number = 0;
  public shopIndex: number[] = [];

  constructor(
    private store: Store<RootState>,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    // this.items$ = this.store.pipe(select(getItemsByNameAndShopID(),{shopID:0, itemName: 'Yoghurt'}))
    this.setUpList();
  }

  private setUpList() {
    let addressValueChange = this.addressSelector.valueChanges;
    let shoppingList = this.shoppingListService.getShoppingList();

    combineLatest(addressValueChange, shoppingList).subscribe(
      ([shopID, shoppingList]) => {
        this.currentShopId = Number(shopID).valueOf();
        // this.items$ = this.store.pipe(select(getItemsByNameAndShopID(), {shopID, itemNames: Array.from(shoppingList.values())}))
        this.items$ = this.store
          .pipe(
            select(getItemsByNameAndShopID(), {
              shopID,
              itemNames: Array.from(shoppingList.values()),
            })
          )
          .pipe(
            map((items) => {
              this.shopIndex = [];
              for (let i = 0; i < items.length; i++) {
                for (let x = 0; x < items[i].shops.length; x++) {
                  if (items[i].shops[x].shopId === this.currentShopId) {
                    this.shopIndex.push(x);
                  }
                }
              }

              return items;
            })
          );
      }
    );
  }
}
