import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddItem, getShopById, RootState, UpdateItem } from '@appNgrx';
import { Item, Shop } from '@data-models';
import { Modals } from '@enums';
import { select, Store } from '@ngrx/store';
import { IDService, ItemHttpService } from '@services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-item-modal',
  templateUrl: './add-item-modal.html',
  styleUrls: ['../../app.component.css'],
})
export class AddItemModal implements OnInit {
  @Input() itemString?: string;
  @Input() itemObject?: Item;
  @Input() itemExists: boolean;
  @Input() shopId: number;
  @Input() itemID: number;
  @Input() editItem: boolean;
  @Input() selectedShopIndex: number;
  public shop$: Observable<Shop>;
  public aisleNumber = new FormControl('');

  constructor(
    private modalService: NgxSmartModalService,
    private store: Store<RootState>,
    private idService: IDService,
    private itemService: ItemHttpService
  ) {}

  ngOnInit() {
    this.shop$ = this.store.pipe(select(getShopById(), { shopId: this.shopId }));
  }

  public closeModal() {
    this.modalService.get(Modals.AddItem).close();
  }

  public saveItem() {
    switch(this.editItem){
    case false: 
      if (this.itemExists) {
      this.store.dispatch(
        new UpdateItem({
          id: this.itemObject.id,
          changes: {
            shops: [
              ...this.itemObject.shops,
              {
                shopId: this.shopId,
                aisle: this.aisleNumber.value,
              },
            ],
          },
        })
      );
    } else {
      this.idService.getNextId().then((nextId) => {
        this.store.dispatch(
          new AddItem({
            id: nextId,
            name: this.itemString,
            shops: [
              {
                shopId: this.shopId,
                aisle: this.aisleNumber.value,
              },
            ],
          })
        );
      });
    }
    break;
    case true:

      let newShopsArray = this.itemObject.shops
      newShopsArray[this.selectedShopIndex].aisle = this.aisleNumber.value;
      this.store.dispatch(new UpdateItem({
        id: this.itemObject.id,
        changes:{
          shops: newShopsArray
        }
      }))
  }
 

    this.modalService.get(Modals.AddItem).close();
  }
}
