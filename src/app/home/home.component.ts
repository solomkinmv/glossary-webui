import {OnInit, Component} from "@angular/core";
import {AuthGuard} from "../_guards/auth.guard";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private authGuard: AuthGuard) {
  }

  ngOnInit() {
    // load home component

    // let url = `/${this.route.path}`;

    this.authGuard.isLoggedIn()
      .then((logged: boolean) => this.loggedIn = logged)
      .catch(e => console.log("User is not logged in"));
  }
}
