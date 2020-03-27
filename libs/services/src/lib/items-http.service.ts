import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Item } from '@data-models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemHttpService {

    constructor(private http: HttpClient){}

    public getItems(): Observable<Item[]>{
     console.error("Triggered?");
        
        return this.http.get<Item[]>('api/items');
    }
}