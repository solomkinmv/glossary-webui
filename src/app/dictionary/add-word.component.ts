import {Component, Input} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {SearchRecord} from "./_models/search-record";
import {Word} from "./_models/word";
import {WordService} from "./_services/word.service";
import {AlertService} from "../_services/alert.service";
import {WordSetService} from "./_services/word-set.service";
import {WordSet} from "./_models/word-set";

@Component({
  selector: 'add-word',
  templateUrl: 'add-word.component.html'
})
export class AddWordComponent {
  private newWord: Word;
  private alternativeTranslations: string[];
  private searchRecords: Observable<SearchRecord[]>;
  private searchTerms = new Subject<string>();
  @Input() private set: WordSet;

  constructor(private wordSetService: WordSetService,
              private wordService: WordService,
              private alertService: AlertService) {
    // this.initNewWord();
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

  private initNewWord(): void {
    this.newWord = new Word(null, null, null);
  }

  private initSearch(): void {
    this.initNewWord();
    this.initSearchRecords();
    this.alternativeTranslations = null;
  }
}
