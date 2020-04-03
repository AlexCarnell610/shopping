import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, LoadShops } from '@appNgrx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<RootState>, private router: Router) {}

  goToSearch() {
    this.router.navigate(['/shops']);
  }

  goToShopList() {
    this.router.navigate(['/shops/list']);
  }
}
