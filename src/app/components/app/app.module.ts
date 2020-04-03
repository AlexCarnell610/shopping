//https://blog.angular-university.io/ngrx-entity/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store, select } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { reducers, ShopEffects, RootState, LoadShops, LoadItems } from '@appNgrx';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ItemEffects } from 'src/ngrx/effects/items-effects';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ModalModule } from './modals/modal.module';
import { IDService } from '../../../../libs/services/src/lib/idservice.service';
import { getAllItems } from '../../../ngrx/selectors/item-selectors';
import { map } from 'rxjs/operators';

const COMPONENTS = [AppComponent];

const environment = {
  development: true,
  production: false,
};

@NgModule({
  declarations: COMPONENTS,
  imports: [
    ModalModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ShopEffects, ItemEffects]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<RootState>) => {
        return () => {
          store.dispatch(new LoadShops());
          store.dispatch(new LoadItems());
        };
      },
      multi: true,
      deps: [Store],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private idService: IDService, private store: Store<RootState>) {
    this.idService.setIds(
      this.store.pipe(select(getAllItems)).pipe(
        map((items) =>
          items.map((item) => {
            return item.id;
          })
        )
      )
    );
  }
}