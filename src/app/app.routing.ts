import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DictionaryComponent} from "./dictionary/dictionary.component";
import {WordSetComponent} from "./dictionary/word-set.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dictionary', component: DictionaryComponent},
  {path: 'set/:id', component: WordSetComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}

];

export const routing = RouterModule.forRoot(appRoutes);
