import {NgModule} from "@angular/core";
import {DictionaryRoutingModule} from "./dictionary-routing.module";
import {DictionaryComponent} from "./dictionary.component";
import {WordSetComponent} from "./word-set.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WritePracticeComponent} from "./practice/write-practice.component";
import {PracticeService} from "./_services/practice.service";
import {WordService} from "./_services/word.service";
import {WordSetService} from "./_services/word-set.service";
import {PracticeComponent} from "./practice/practice.component";
import {QuizPracticeComponent} from "./practice/quiz-practice.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DictionaryRoutingModule
  ],
  declarations: [
    DictionaryComponent,
    WordSetComponent,
    PracticeComponent,
    QuizPracticeComponent,
    WritePracticeComponent
  ],
  providers: [
    WordSetService,
    WordService,
    PracticeService
  ]
})
export class DictionaryModule {
}
