import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ShoppingListService } from '@services';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  constructor(private listService: ShoppingListService, private router: Router) {}

  public buttonClicked: boolean[] = [false];
  public itemsFormArray = new FormArray([]);

  ngOnInit() {
    this.itemsFormArray.push(new FormControl(''));
  }

  public addClicked(index) {
    if (this.itemsFormArray.controls[index].value !== '') {
      if (!this.buttonClicked[index]) {
        this.buttonClicked[index] = !this.buttonClicked[index];
        this.buttonClicked.push(false);
        this.itemsFormArray.push(new FormControl(index));
      } else {
        this.buttonClicked.splice(index, 1);
        this.itemsFormArray.removeAt(index);
      }
    }
  }

  public submit() {
    for (let i = 0; i < this.itemsFormArray.controls.length - 1; i++) {
      this.listService.addItem(this.itemsFormArray.controls[i].value, i);
    }
    this.listService.saveShoppingList();
    this.router.navigate(['shops/search']);
  }
}
