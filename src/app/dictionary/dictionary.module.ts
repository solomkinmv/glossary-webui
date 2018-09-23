import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WordSetsComponent} from "./word-sets/word-sets.component";
import {DictionaryRoutingModule} from "./dictionary.routing";
import {WordSetsService} from "./_services/word-sets.service";
import {EditWordSetComponent} from "./word-sets/edit-word-set/edit-word-set.component";
import {FormsModule} from "@angular/forms";
import {WordSetComponent} from "./word-set/word-set.component";
import {ModalComponent} from "./modal/modal.component";
import {AddWordComponent} from "./word-set/add-word/add-word.component";
import {ImageService} from "./_services/image.service";
import {WordService} from "./_services/word.service";
import {PracticeComponent} from "./practice/practice.component";
import {CardsPracticeComponent} from "./practice/cards/cards-practice.component";
import {ListeningPracticeComponent} from "./practice/listening/listening-practice.component";
import {PracticeSummaryComponent} from "./practice/summary/practice-summary.component";
import {PronunciationComponent} from "./practice/pronunciation/pronuncition.component";
import {QuizPracticeComponent} from "./practice/quiz/quiz-practice.component";
import {RepetitionPracticeComponent} from "./practice/repetition/repetition-practice.component";
import {WritePracticeComponent} from "./practice/writing/write-practice.component";
import {PracticeService} from "./practice/_services/practice.service";
import {SpeechRecognitionService} from "./practice/_services/speech-recognition.service";
import {TranslateService} from "./_services/translate.service";

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    FormsModule
  ],
  declarations: [
    WordSetsComponent,
    EditWordSetComponent,
    WordSetComponent,
    ModalComponent,
    AddWordComponent,
    WordSetComponent,
    PracticeComponent,
    CardsPracticeComponent,
    ListeningPracticeComponent,
    PracticeSummaryComponent,
    PronunciationComponent,
    QuizPracticeComponent,
    RepetitionPracticeComponent,
    WritePracticeComponent
  ],
  providers: [
    WordSetsService,
    WordService,
    ImageService,
    PracticeService,
    SpeechRecognitionService,
    TranslateService
  ]
})
export class DictionaryModule {
}
