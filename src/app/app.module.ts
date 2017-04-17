import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {AlertComponent} from "./_directives/alert.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {AppRoutingModule} from "./app.routing";
import {Router} from "@angular/router";
import {EqualValidator} from "./_directives/equal-validator";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EqualValidator
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
