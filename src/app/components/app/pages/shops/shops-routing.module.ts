import { Routes, RouterModule } from "@angular/router";
import { ShopListComponent } from './shop-list/shop-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path: '', component: ShopListComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class ShopsRoutingModule{}