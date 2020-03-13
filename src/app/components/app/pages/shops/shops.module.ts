import { NgModule } from "@angular/core";
import { ShopListComponent } from './shop-list/shop-list.component';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { shopReducer } from '@appNgrx';
import { ShopsRoutingModule } from './shops-routing.module';

const COMPONENTS = [ShopListComponent]

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule, 
        ShopsRoutingModule, 
        StoreModule.forFeature('shopState123', shopReducer)],
    providers: []
})
export class ShopsModule {}