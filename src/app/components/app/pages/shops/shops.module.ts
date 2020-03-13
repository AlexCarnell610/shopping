import { NgModule } from "@angular/core";
import { ShopListComponent } from './shop-list/shop-list.component';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { shopReducer } from '@appNgrx';

const COMPONENTS = [ShopListComponent]

@NgModule({
    declarations: [COMPONENTS],
    imports: [CommonModule, StoreModule.forFeature('[State]Shops', shopReducer)],
    providers: []
})
export class ShopsModule {}