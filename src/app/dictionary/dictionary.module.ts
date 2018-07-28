import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WordSetsComponent} from "./word-sets/word-sets.component";
import {DictionaryRoutingModule} from "./dictionary.routing";
import {WordSetsService} from "./_services/word-sets.service";

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule
  ],
  declarations: [
    WordSetsComponent
  ],
  providers: [
    WordSetsService
  ]
})
export class DictionaryModule { }
