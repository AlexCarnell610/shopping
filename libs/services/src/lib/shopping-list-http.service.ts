import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListHttpService {
  constructor(private http: HttpClient) {}

  public postList(list: Map<number, string>) {
    let postValue = {};

    list.forEach((value: string, key: number) => {
      postValue[key] = value;
    });

    this.http.post('api/shoppingList', postValue).subscribe((resopnse) => {
      console.warn('ListPostResponse', resopnse);
    });
  }

  public getList() {
    return this.http.get('api/shoppingList');
  }
}
