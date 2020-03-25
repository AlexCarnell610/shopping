import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Shop } from "@data-models";

@Injectable({
  providedIn: "root",
})
export class ShopHttpService {
  constructor(private http: HttpClient) {}

  public getAllShops() {
    return this.http.get<Shop[]>("api/shops");
  }
}
