import { Routes, RouterModule } from "@angular/router";
import { ShopListComponent } from "./shop-list/shop-list.component";
import { NgModule } from "@angular/core";
import { ShopSearchComponent } from "./shop-search/shop-search.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [
  { path: "search", component: ShopSearchComponent },
  { path: "list/:shop", component: ShopListComponent },
  { path: "", component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsRoutingModule {}
