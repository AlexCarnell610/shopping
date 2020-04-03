import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { RootState } from '@appNgrx';
import { Store, select } from '@ngrx/store';
import { getItemsByNameAndShopID, getItemsByName } from 'src/ngrx/selectors/item-selectors';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, of } from 'rxjs';
import { Item } from '@data-models';
import { ShoppingListService } from 'libs/services/src/lib/shopping-list.service';
import { map, filter, tap } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Modals } from '@enums';

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

  constructor(
    private store: Store<RootState>,
    private shoppingListService: ShoppingListService,
    private modalService: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.setUpList();
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
        map((list) => {
          return Array.from(list.values()).filter(
            (listItem) => items.findIndex((item) => item.name.toLowerCase() === listItem.toLowerCase()) === -1
          );
        })
      );
    } else {
      return of([]);
    }
  }

  public openAddItemModal(item: string) {
    this.clickedItem = item;
    this.modalService.get(Modals.AddItem).open();
  }
}
