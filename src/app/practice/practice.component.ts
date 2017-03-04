import {Component, OnInit} from "@angular/core";
import {WordSet} from "../dictionary/word-set";
import {WordSetService} from "../_services/word-set.service";

@Component({
  templateUrl: 'practice.component.html'
})
export class PracticeComponent implements OnInit {
  wordSets: Array<WordSet>;

  constructor(private wordSetService: WordSetService) {
  }

  ngOnInit() {
    this.wordSetService.getAll()
      .then((wordSets: Array<WordSet>) => this.wordSets = wordSets);
  }
}
