import { Component, Input, OnInit } from "@angular/core";
import { Shop } from "@data-models";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Modals } from "@enums";
import { RootState, getShopById, AddItem } from "@appNgrx";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";

@Component({
  selector: "add-item-modal",
  templateUrl: "./add-item-modal.html",
  styleUrls: ["../../app.component.css"],
})
export class AddItemModal implements OnInit {
  @Input() item: string = "Banana";
  @Input() shopId: number;
  public shop$: Observable<Shop>;
  public aisleNumber = new FormControl("");

  constructor(
    private modalService: NgxSmartModalService,
    private store: Store<RootState>
  ) {}

  ngOnInit() {
    this.shop$ = this.store.pipe(
      select(getShopById(), { shopId: this.shopId })
    );
  }

  public closeModal() {
    this.modalService.get(Modals.AddItem).close();
  }

  public saveItem() {
    //need to check if item exists first, if it does then add shopid to list of shops otherwise just add it
  }
}
