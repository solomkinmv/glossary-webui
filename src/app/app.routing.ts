import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dictionary', loadChildren: 'app/dictionary/dictionary.module#DictionaryModule', canLoad: [AuthGuard]},
  {path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ], providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {
}
