import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private keycloakAngular: KeycloakService) {
  }

  public logout() {
    this.keycloakAngular.logout()
  }
}
