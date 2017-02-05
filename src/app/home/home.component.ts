import {OnInit, Component} from "@angular/core";
import {TokenHolder} from "../_models/TokenHolder";
import {UserService} from "../_services/user.service";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  tokenHolder: TokenHolder;

  constructor(private userService: UserService) {
    this.tokenHolder = JSON.parse(localStorage.getItem('tokenHolder'));
  }

  ngOnInit() {
    // load home component
  }
}
