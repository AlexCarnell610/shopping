import { Injectable } from "@angular/core";
import { ShoppingListHttpService } from "./shopping-list-http.service";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  constructor(private listHttp: ShoppingListHttpService) {}
  private emptyMapItem = "!!!!!"
  private shoppingList$: BehaviorSubject<
    Map<number, string>
  > = new BehaviorSubject(new Map([[0,this.emptyMapItem]]));
  private _listLength: number = 0;

  public getShoppingList() {
    if (this.shoppingList$.getValue().get(0) === this.emptyMapItem) {
      
      this.getListFromHttp();
    }

    
    return this.shoppingList$.asObservable();
  }

  public addItem(item: string, index: number) {
    this.shoppingList$.value.set(index, item.toLowerCase());
  }

  public saveShoppingList() {
    this.listHttp.postList(this.shoppingList$.getValue());
  }

  private getListFromHttp() {
    this.listHttp
      .getList()
      .pipe(
        map((result) => {
          return this.convertObjectToMap(result);
        })
      )
      .subscribe((list) => {
        this.shoppingList$.next(list);
      });
  }

  get listLength() {
    return this.shoppingList$.getValue().size
  }

  private convertObjectToMap(object): Map<number, string> {
    let map: Map<number, string> = new Map();
    for (let value in object) {
      map.set(new Number(value).valueOf(), object[value]);
    }

    return map;
  }
}
