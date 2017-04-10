import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {WordService} from "./_services/word.service";
import {Word} from "./_models/word";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {SearchRecord} from "./_models/search-record";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  private set: WordSet;
  private newWord: Word;
  private alternativeTranslations: string[];
  private searchRecords: Observable<SearchRecord[]>;
  private searchTerms = new Subject<string>();

  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute,
              private wordService: WordService,
              private alertService: AlertService) {
    this.initNewWord();
  }

  ngOnInit(): void {
    console.log("WordSetComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((set: WordSet) => {
        this.set = set;
        console.log(this.set);
      });

    this.initSearch();
  }

  private initSearchRecords() {
    this.searchRecords = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.wordService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.empty()
      )
      .catch(error => {
        console.log(error);
        return Observable.empty();
      });
  }

  private search(): void {
    console.log(`search: ${this.newWord.text}`);
    this.searchTerms.next(this.newWord.text);
  }

  private chooseWord(record: SearchRecord): void {
    console.log("Choosing word: " + JSON.stringify(record));
    if (record.translations.length == 1) {
      let word = new Word(record.text, record.translations[0], null);
      this.addWord(word);
      return;
    }

    this.newWord = new Word(record.text, null, null);
    this.alternativeTranslations = record.translations;
    this.searchRecords = Observable.empty();
  }

  private chooseTranslation(translation: string): void {
    this.newWord.translation = translation;
    this.addWord(this.newWord);
  }

  private addWord(word: Word): void {
    this.wordSetService.addWord(this.set.id, word)
      .subscribe(
        (addedWord: Word) => {
          this.alertService.success("Added new record");
          this.set.words.push(addedWord);
        },
        err => this.alertService.error(err)
      );
    this.initSearch();
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

  private initNewWord(): void {
    this.newWord = new Word(null, null, null);
  }

  private initSearch(): void {
    this.initNewWord();
    this.initSearchRecords();
    this.alternativeTranslations = null;
  }
}
