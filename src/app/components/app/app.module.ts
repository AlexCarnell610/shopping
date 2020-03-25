//https://blog.angular-university.io/ngrx-entity/

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule, Store } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { reducers, ShopEffects, RootState, LoadShops } from "@appNgrx";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

const COMPONENTS = [AppComponent];

const environment = {
  development: true,
  production: false,
};

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ShopEffects]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<RootState>) => {
        return () => {
          store.dispatch(new LoadShops());
        };
      },
      multi: true,
      deps: [Store],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
