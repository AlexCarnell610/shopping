import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "@data-models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ItemHttpService {
  constructor(private http: HttpClient) {}

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>("api/items");
  }

  public postItem(item: Item) {
    return this.http.post<Item>("api/items", item);
  }
}
