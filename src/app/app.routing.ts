import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./_guards/auth.guard";
import {AppComponent} from "./app.component";

const appRoutes: Routes = [
  // {path: 'login', component: LoginComponent},
  {path: '*', component: AppComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'dictionary', loadChildren: 'app/dictionary/dictionary.module#DictionaryModule', canActivate: [AuthGuard]},
  // {path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate: [AuthGuard]},
  // {path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},

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
