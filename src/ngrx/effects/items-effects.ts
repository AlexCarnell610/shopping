import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ItemHttpService } from '@services';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddItem, ItemActionsEnum, LoadItems, LoadItemsFail, LoadItemsSuccess, UpdateItem } from '../actions';

@Injectable({
  providedIn: 'root',
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

  @Effect({ dispatch: false })
  addItem$ = this.actions$.pipe(
    ofType<AddItem>(ItemActionsEnum.ADD_ITEM),
    switchMap((action) => {
      return this.itemHttp.postItem(action.payload);
    })
  );

  @Effect({dispatch: false})
  updateItem$ = this.actions$.pipe(
    ofType<UpdateItem>(ItemActionsEnum.UPDATE_ITEM),
    switchMap(action => {
      return this.itemHttp.updateItem(action.payload).pipe(
        map((success) => of(success)),
        catchError((error) => of(error))
      );
      
    }));
}
