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
    this.loggedIn = this.authService.containsToken();
  }

  private logout(): void {
    console.log('Logging out');
    this.authService.logout();
  }
}
