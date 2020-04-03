import { Component, Input, OnInit } from '@angular/core';
import { Shop, Item } from '@data-models';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Modals } from '@enums';
import { RootState, getShopById, AddItem } from '@appNgrx';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { getAllItems } from '../../../../../ngrx/selectors/item-selectors';
import { IDService } from '../../../../../../libs/services/src/lib/idservice.service';

@Component({
  selector: 'add-item-modal',
  templateUrl: './add-item-modal.html',
  styleUrls: ['../../app.component.css'],
})
export class AddItemModal implements OnInit {
  @Input() item: string = 'Banana';
  @Input() shopId: number;
  @Input() itemID: number;
  public shop$: Observable<Shop>;
  public aisleNumber = new FormControl('');
  private itemNames: string[] = [];

  constructor(
    private modalService: NgxSmartModalService,
    private store: Store<RootState>,
    private idService: IDService
  ) {}

  ngOnInit() {
    this.shop$ = this.store.pipe(select(getShopById(), { shopId: this.shopId }));
    this.store.pipe(select(getAllItems)).subscribe((items) => {
      items.forEach((item) => {
        this.itemNames.push(item.name.toLowerCase());
      });
    });
  }

  public closeModal() {
    this.modalService.get(Modals.AddItem).close();
  }

  public saveItem() {
    if (this.itemExists(this.item)) {
    } else {
      this.idService
        .getNextId$()
        .subscribe((nextId) => {
          console.error(nextId);
          this.store.dispatch(
            new AddItem({
              id: nextId,
              name: this.item,
              shops: [
                {
                  shopId: this.shopId,
                  aisle: this.aisleNumber.value,
                },
              ],
            })
          );
        })
        .unsubscribe();
    }
    this.modalService.get(Modals.AddItem).close();
  }

  private itemExists(itemName: string) {
    return this.itemNames.includes(itemName.toLowerCase());
  }
}
