import {Component, OnInit} from "@angular/core";
import {AuthGuard} from "../_guards/auth.guard";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private authGuard: AuthGuard) {
  }

  ngOnInit() {
    this.loggedIn = this.authGuard.isLoggedIn();
  }
}
