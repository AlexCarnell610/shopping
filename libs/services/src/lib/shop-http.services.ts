import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ShopHttpService {

    constructor(private http: HttpClient){}

    public getAllShops(){
        this.http.get('../../../db.json').subscribe(ok => {
            console.log(ok);
            
        })
    }
}