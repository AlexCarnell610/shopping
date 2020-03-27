import { Component, OnInit, Input } from '@angular/core';
import { RootState } from '@appNgrx';
import { Store, select } from '@ngrx/store';
import { getItemsByNameAndShopID } from 'src/ngrx/selectors/item-selectors';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { Item } from '@data-models';
import { ShoppingListService } from 'libs/services/src/lib/shopping-list.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-view-results',
	templateUrl: './view-results.component.html',
	styles: []
})
export class ViewResultsComponent implements OnInit {
	@Input() addressSelector: FormControl;
  public items$: Observable<Item[]>;
  public currentShopId: number = 0;

	constructor(private store: Store<RootState>, private shoppingListService: ShoppingListService) {}

	ngOnInit() {
		// this.items$ = this.store.pipe(select(getItemsByNameAndShopID(),{shopID:0, itemName: 'Yoghurt'}))
  
    this.shoppingListService.getShoppingList().subscribe(list => {
      console.error("LIST!!!!!!!", list);
      
    })
    
    this.setUpList();
  }
  
  private setUpList(){

    let addressValueChange = this.addressSelector.valueChanges
    let shoppingList = this.shoppingListService.getShoppingList()

    combineLatest(addressValueChange, shoppingList).subscribe(([shopID, shoppingList]) => {
      console.error("Array?",Array.from(shoppingList.values()));
      this.currentShopId = shopID
      this.items$ = this.store.pipe(select(getItemsByNameAndShopID(), {shopID, itemNames: Array.from(shoppingList.values())}))
    })
  }
}
