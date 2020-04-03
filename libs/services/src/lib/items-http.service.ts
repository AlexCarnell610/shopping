import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@data-models';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemHttpService {
  private ITEM_ENDPOINT = 'api/items';
  constructor(private http: HttpClient) {}

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.ITEM_ENDPOINT);
  }

  public postItem(item: Item) {
    return this.http.post<Item>(this.ITEM_ENDPOINT, item);
  }

  public updateItem(item: Update<Item>) {
   
    return this.http.patch(`${this.ITEM_ENDPOINT}/${item.id}`, item.changes)
    // .subscribe(result => {
    //   console.error(result);
      
    // })
  }
}
