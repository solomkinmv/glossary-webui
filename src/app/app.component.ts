import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('AppComponent init');
    this.authService.loggedIn.subscribe((logged: boolean) => this.loggedIn = logged);
  }

  private logout(): void {
    console.log('Logging out');
    this.authService.logout();
  }
}
