import { Component, Input, OnInit } from "@angular/core";
import { ItemExistsReturn } from '@data-models';
import { Observable } from 'rxjs';

@Component({
    selector: "add-items-modal",
    templateUrl: './add-items-modal.html',
    
  styleUrls: ['../../app.component.css'], 
})
export class AddItemsModal implements OnInit{

    @Input()items$: Observable<ItemExistsReturn[]>;

    ngOnInit(){
        this.items$.subscribe(items => {
            console.error(items);
            
        })
    }
}