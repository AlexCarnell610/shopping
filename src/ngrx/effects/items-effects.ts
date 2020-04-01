import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { switchMap, map, catchError } from "rxjs/operators";
import {
  LoadItems,
  ItemActionsEnum,
  LoadItemsSuccess,
  LoadItemsFail,
  AddItem,
} from "../actions";
import { of } from "rxjs";
import { ItemHttpService } from "libs/services/src/lib/items-http.service";

@Injectable({
  providedIn: "root",
})
export class ItemEffects {
  constructor(private actions$: Actions, private itemHttp: ItemHttpService) {}

  @Effect()
  loadItems$ = this.actions$.pipe(
    ofType<LoadItems>(ItemActionsEnum.LOAD_ITEMS),
    switchMap(() => {
      return this.itemHttp.getItems().pipe(
        map((items) => new LoadItemsSuccess(items)),
        catchError((error) => of(new LoadItemsFail(error)))
      );
    })
  );

  @Effect()
  addItem$ = this.actions$.pipe(
    ofType<AddItem>(ItemActionsEnum.ADD_ITEM),
    switchMap((action) => {
      return this.itemHttp.postItem(action.payload);
    })
  );
}
