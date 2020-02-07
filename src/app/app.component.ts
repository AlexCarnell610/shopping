import { Component } from "@angular/core";
import { initialState } from './components/ngrx/reducers/shop-reducers';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(){
    console.log("Initial State",initialState)
  }
  title = "CodeSandbox";
}
