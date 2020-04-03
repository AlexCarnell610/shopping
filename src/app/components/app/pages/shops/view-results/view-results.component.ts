import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getItemsByName, getItemsByNameAndShopID, RootState } from '@appNgrx';
import { Item } from '@data-models';
import { Modals } from '@enums';
import { select, Store } from '@ngrx/store';
import { ShoppingListService } from '@services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface ItemExistsReturn {
  exists: boolean;
  item?: Item;
}
@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styles: [],
})
export class ViewResultsComponent implements OnInit {
  @Input() addressSelector: FormControl;
  public items$: Observable<Item[]> = new Observable();
  public currentShopId: number = 0;
  public shopIndex: number[] = [];
  public shoppingList: string[];
  public absentItems: Observable<string[]>;
  public clickedItem: string;
  public clickedItemObject: Item;
  private allItems: Item[];
  public itemExistsInStore: boolean;

  constructor(
    private store: Store<RootState>,
    private shoppingListService: ShoppingListService,
    private modalService: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.setUpList();
    this.setUpAllItemsList();
  }
  private setUpAllItemsList() {
    this.shoppingListService.getShoppingList().subscribe((list) => {
      this.store.pipe(select(getItemsByName(), { itemNames: Array.from(list.values()) })).subscribe((items) => {
        this.allItems = items;
      });
    });
  }

  private setUpList() {
    let addressValueChange = this.addressSelector.valueChanges;
    let shoppingList = this.shoppingListService.getShoppingList();

    combineLatest(addressValueChange, shoppingList).subscribe(([shopID, shoppingList]) => {
      let itemNames = [...shoppingList.values()];

      this.currentShopId = Number(shopID).valueOf();
      this.items$ = this.store
        .pipe(
          select(getItemsByNameAndShopID(), {
            shopID,
            itemNames,
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
            this.absentItems = this.findAbsentItems(items);
            return items;
          })
        );
    });
  }
  private findAbsentItems(items: Item[]): Observable<string[]> {
    if (items.length !== this.shoppingListService.listLength) {
      return this.shoppingListService.getShoppingList().pipe(
        map((shoppingList) => {
          return Array.from(shoppingList.values()).filter(
            (shoppingListItem) =>
              items.findIndex((item) => item.name.toLowerCase() === shoppingListItem.toLowerCase()) === -1
          );
        })
      );
    } else {
      return of([]);
    }
  }

  public openAddItemModal(item: string) {
    let itemExists = this.itemExists(item);
    this.itemExistsInStore = itemExists.exists;
    if (itemExists.exists) {
      this.clickedItemObject = itemExists.item;
    } else {
      this.clickedItem = item;
    }
    this.modalService.get(Modals.AddItem).open();
  }

  private itemExists(item: string): ItemExistsReturn {
    let returnValue: ItemExistsReturn = {
      exists: false,
    };
    for (let i = 0; i < this.allItems.length; i++) {
      if (this.allItems[i].name.toLowerCase() === item.toLowerCase()) {
        returnValue = {
          exists: true,
          item: this.allItems[i],
        };
      }
    }
    return returnValue;
  }
}
