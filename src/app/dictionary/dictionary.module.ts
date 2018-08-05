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
    WordSetComponent
  ],
  providers: [
    WordSetsService,
    WordService,
    ImageService
  ]
})
export class DictionaryModule {
}
