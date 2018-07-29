import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializer} from "./app-init";
import {AppRoutingModule} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {AlertService} from "./_services/alert.service";
import {AlertComponent} from "./alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
