import {Component, OnInit} from "@angular/core";
import {AuthGuard} from "../_guards/auth.guard";
import {UserService} from "../_services/user.service";
import {Statistic} from "../_models/statistic";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private loggedIn: boolean = false;
  private statistic: Statistic;


  constructor(private authGuard: AuthGuard,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loggedIn = this.authGuard.isLoggedIn();
    this.userService.statistic()
      .subscribe((stats: Statistic) => this.statistic = stats);
  }
}
