import { NgModule, APP_INITIALIZER } from "@angular/core";
import { ShopListComponent } from './shop-list/shop-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { shopReducer, RootState, LoadShops, ShopEffects } from '@appNgrx';
import { ShopsRoutingModule } from './shops-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ShopSearchComponent } from './shop-search/shop-search.component';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [ShopListComponent]

@NgModule({
    declarations: [COMPONENTS, ShopSearchComponent],
    imports: [
        CommonModule,
        ShopsRoutingModule,
        StoreModule.forFeature('ShopState', shopReducer),
        EffectsModule.forFeature([ShopEffects]),
    ReactiveFormsModule],
    providers: []
})
export class ShopsModule { }