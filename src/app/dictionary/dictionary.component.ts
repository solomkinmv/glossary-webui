import {Component, OnInit} from "@angular/core";
import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {Observable} from "rxjs";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  private sets: Observable<WordSet[]>;
  private set: WordSet;

  constructor(private wordSetService: WordSetService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log("DictionaryComponent init");
    this.sets = this.wordSetService.getAll();
  }

  private startAddingWordSet(): void {
    this.set = new WordSet();
  }

  private editWordSet(wordSet: WordSet): void {
    this.set = wordSet;
  }

  private deleteWordSet(wordSet: WordSet): void {
    this.wordSetService.remove(wordSet.id)
      .subscribe(data => {
          this.alertService.success("Removed Word Set");
        },
        err => this.alertService.error(err));
  }

  private onNotify(wordSet: WordSet) {
    console.log("on notify");
    console.log(wordSet);
    this.set = null;
  }
}
