import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loggedIn: boolean = false;
  public profileUrl: string;

  constructor(private authService: KeycloakService) {
    this.profileUrl = environment.keycloak.url + "/realms/glossary/account/";
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
