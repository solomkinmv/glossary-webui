import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WordSetsComponent} from "./word-sets/word-sets.component";
import {DictionaryRoutingModule} from "./dictionary.routing";
import {WordSetsService} from "./_services/word-sets.service";
import {EditWordSetComponent} from "./word-sets/edit-word-set.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    FormsModule
  ],
  declarations: [
    WordSetsComponent,
    EditWordSetComponent
  ],
  providers: [
    WordSetsService
  ]
})
export class DictionaryModule { }
