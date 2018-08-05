import {WordSetsComponent} from "./word-sets/word-sets.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WordSetComponent} from "./word-set/word-set.component";

const routes: Routes = [
  {path: '', component: WordSetsComponent},
  {path: 'set/:id', component: WordSetComponent}
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
