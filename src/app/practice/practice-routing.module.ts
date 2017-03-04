import {Routes, RouterModule} from "@angular/router";
import {PracticeComponent} from "./practice.component";
import {NgModule} from "@angular/core";
import {WritePracticeComponent} from "./write-practice.component";

const routes: Routes = [
  {path: '', component: PracticeComponent},
  {path: 'write/:id', component: WritePracticeComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ], exports: [
    RouterModule
  ]
})
export class PracticeRoutingModule {
}
