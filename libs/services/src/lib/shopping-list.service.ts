import { Injectable } from '@angular/core';
import { ShoppingListHttpService } from './shopping-list-http.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	constructor(private listHttp: ShoppingListHttpService) {}
	private shoppingList$: BehaviorSubject<
		Map<number, string>
	> = new BehaviorSubject(new Map());
	private _listLength: number = 0;

	public getShoppingList() {
		if (this.shoppingList$.getValue().size === 0) {
			this.getListFromHttp();
		}

		return this.shoppingList$;
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
				map(result => {
					return this.convertObjectToMap(result);
				})
			)
			.subscribe(list => {

				this.shoppingList$.next(list);
			});
	}

	set listLength(length: number) {
		this._listLength = length;
	}

	get listLength(){
		return this._listLength;
	}

	private convertObjectToMap(object): Map<number, string> {
		let map: Map<number, string> = new Map();
		for (let value in object) {
			map.set(new Number(value).valueOf(), object[value]);
		}

		this.listLength = map.size;

		return map;
	}
}
