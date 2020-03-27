import { NgModule, APP_INITIALIZER } from "@angular/core";
import { ShopListComponent } from "./shop-list/shop-list.component";
import { StoreModule, Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { shopReducer, ShopEffects, itemReducer } from "@appNgrx";
import { ShopsRoutingModule } from "./shops-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { ShopSearchComponent } from "./shop-search/shop-search.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ItemEffects } from 'src/ngrx/effects/items-effects';
import { ViewResultsComponent } from './view-results/view-results.component';

const COMPONENTS = [
  ShopListComponent,
  ShopSearchComponent,
  ShoppingListComponent,
  ViewResultsComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    StoreModule.forFeature("ShopState", shopReducer),
    StoreModule.forFeature("ItemState", itemReducer),
    EffectsModule.forFeature([ShopEffects, ItemEffects]),
    ReactiveFormsModule,
  ],
  providers: [],
})
export class ShopsModule {}
