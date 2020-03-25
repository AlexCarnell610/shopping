import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit {
  public buttonClicked: boolean[] = [false];
  public itemsFormArray = new FormArray([]);

  ngOnInit() {
    this.itemsFormArray.push(new FormControl(""));
  }

  public addClicked(index) {
    if (this.itemsFormArray.controls[index].value !== "") {
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

  public submit() {}
}
