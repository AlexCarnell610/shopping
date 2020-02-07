//https://blog.angular-university.io/ngrx-entity/


import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ShopListComponent } from './components/pages/shop-list/shop-list.component';

const COMPONENTS = [
  AppComponent,
  ShopListComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, StoreModule.forFeature('shops', {})],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
