import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {WordService} from "./_services/word.service";
import {Word} from "./_models/word";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  private set: WordSet;

  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute,
              private wordService: WordService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log("WordSetComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((set: WordSet) => {
        this.set = set;
        console.log(this.set);
      });
  }

  private removeWord(word: Word): void {
    this.wordSetService.removeWordFromWordSet(this.set.id, word.id)
      .subscribe(
        data => {
          this.alertService.success("Removed word");
          this.set.words.splice(this.set.words.indexOf(word), 1);
        },
        err => this.alertService.error(err)
      );
  }
}
