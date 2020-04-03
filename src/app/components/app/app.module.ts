//https://blog.angular-university.io/ngrx-entity/

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { getAllItems, LoadItems, LoadShops, reducers, RootState, ShopEffects } from '@appNgrx';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IDService } from '@services';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { map } from 'rxjs/operators';
import { ItemEffects } from '../../../ngrx/effects/items-effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from './modals/modal.module';



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
