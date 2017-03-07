import {Routes, RouterModule} from "@angular/router";
import {DictionaryComponent} from "./dictionary.component";
import {NgModule} from "@angular/core";
import {WordSetComponent} from "./word-set.component";
import {WritePracticeComponent} from "./write-practice.component";

const routes: Routes = [
  {path: '', component: DictionaryComponent},
  {path: 'set/:id', component: WordSetComponent},
  {path: 'practice/:id', component: WritePracticeComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ], exports: [
    RouterModule
  ]
})
export class DictionaryRoutingModule {
}
