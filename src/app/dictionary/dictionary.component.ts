import {Component, OnInit} from "@angular/core";
import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {Observable} from "rxjs";

@Component({
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  private sets: Observable<WordSet[]>;

  constructor(private wordSetService: WordSetService) {
  }

  ngOnInit() {
    this.sets = this.wordSetService.getAll();
  }
}
