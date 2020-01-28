import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShopListComponent } from "./components/pages/shop-list/shop-list.component";

const routes: Routes = [
  {
    path: "shops",
    component: ShopListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
