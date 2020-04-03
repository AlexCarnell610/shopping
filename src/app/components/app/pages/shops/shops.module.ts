import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { itemReducer, ShopEffects, shopReducer } from '@appNgrx';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ItemEffects } from 'src/ngrx/effects/items-effects';
import { ModalModule } from '../../modals/modal.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopSearchComponent } from './shop-search/shop-search.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShopsRoutingModule } from './shops-routing.module';
import { ViewResultsComponent } from './view-results/view-results.component';

const COMPONENTS = [ShopListComponent, ShopSearchComponent, ShoppingListComponent, ViewResultsComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    ModalModule,
    CommonModule,
    ShopsRoutingModule,
    StoreModule.forFeature('ShopState', shopReducer),
    StoreModule.forFeature('ItemState', itemReducer),
    EffectsModule.forFeature([ShopEffects, ItemEffects]),
    ReactiveFormsModule,
    NgxSmartModalModule.forChild(),
  ],
  providers: [],
})
export class ShopsModule {}
