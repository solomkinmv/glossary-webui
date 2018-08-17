import {WordSetsComponent} from "./word-sets/word-sets.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WordSetComponent} from "./word-set/word-set.component";
import {PronunciationComponent} from "./practice/pronunciation/pronuncition.component";
import {CardsPracticeComponent} from "./practice/cards/cards-practice.component";
import {RepetitionPracticeComponent} from "./practice/repetition/repetition-practice.component";
import {ListeningPracticeComponent} from "./practice/listening/listening-practice.component";
import {WritePracticeComponent} from "./practice/writing/write-practice.component";
import {QuizPracticeComponent} from "./practice/quiz/quiz-practice.component";
import {PracticeComponent} from "./practice/practice.component";

const routes: Routes = [
  {path: '', component: WordSetsComponent},
  {path: 'set/:id', component: WordSetComponent},
  {path: 'practice', component: PracticeComponent},
  {path: 'practice/quiz', component: QuizPracticeComponent},
  {path: 'practice/writing', component: WritePracticeComponent},
  {path: 'practice/listening', component: ListeningPracticeComponent},
  {path: 'practice/repetition', component: RepetitionPracticeComponent},
  {path: 'practice/cards', component: CardsPracticeComponent},
  {path: 'practice/pronunciation', component: PronunciationComponent},
  {path: 'practice/:id', component: PracticeComponent},
  {path: 'practice/:id/quiz', component: QuizPracticeComponent},
  {path: 'practice/:id/writing', component: WritePracticeComponent},
  {path: 'practice/:id/listening', component: ListeningPracticeComponent},
  {path: 'practice/:id/repetition', component: RepetitionPracticeComponent},
  {path: 'practice/:id/cards', component: CardsPracticeComponent},
  {path: 'practice/:id/pronunciation', component: PronunciationComponent},
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
