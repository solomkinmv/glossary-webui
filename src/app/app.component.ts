import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(private authService: KeycloakService) {
  }

  ngOnInit(): void {
    console.log('AppComponent init');
    this.authService.isLoggedIn().then((logged: boolean) => this.loggedIn = logged);
  }

  private logout(): void {
    console.log('Logging out');
    this.authService.logout();
  }
}
