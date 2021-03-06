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
import {AddWordComponent} from "./add-word.component";
import {ModalComponent} from "./modal/modal.component";
import {ImageService} from "./_services/image.service";
import {EditWordSetComponent} from "./edit-word-set.component";
import {ListeningPracticeComponent} from "./practice/listening-practice.component";
import {RepetitionPracticeComponent} from "./practice/repetition-practice.component";
import {PracticeSummaryComponent} from "./practice/practice-summary.component";
import {CardsPracticeComponent} from "./practice/cards-practice.component";
import {PronunciationComponent} from "./practice/pronuncition.component";
import {SpeechRecognitionService} from "./_services/speech-recognition.service";

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
    WritePracticeComponent,
    AddWordComponent,
    ModalComponent,
    EditWordSetComponent,
    ListeningPracticeComponent,
    RepetitionPracticeComponent,
    PracticeSummaryComponent,
    CardsPracticeComponent,
    PronunciationComponent
  ],
  providers: [
    WordSetService,
    WordService,
    PracticeService,
    ImageService,
    SpeechRecognitionService
  ]
})
export class DictionaryModule {
}
