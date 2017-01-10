import {OnInit, Component} from "@angular/core";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // load home component
  }
}
