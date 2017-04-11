import {RouterModule, Routes} from "@angular/router";
import {DictionaryComponent} from "./dictionary.component";
import {NgModule} from "@angular/core";
import {WordSetComponent} from "./word-set.component";
import {WritePracticeComponent} from "./practice/write-practice.component";
import {PracticeComponent} from "./practice/practice.component";
import {QuizPracticeComponent} from "./practice/quiz-practice.component";

const routes: Routes = [
  {path: '', component: DictionaryComponent},
  {path: 'set/:id', component: WordSetComponent},
  {path: 'practice/:id', component: PracticeComponent},
  {path: 'practice/:id/quiz', component: QuizPracticeComponent},
  {path: 'practice/:id/writing', component: WritePracticeComponent},
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
