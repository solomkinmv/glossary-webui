import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {WordService} from "./_services/word.service";
import {Word} from "./_models/word";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
// Observable class extensions
import "rxjs/add/observable/of";
// Observable operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {WordStage} from "./_models/word-stage";
import {SearchRecord} from "./_models/search-record";

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  private set: WordSet;
  private newWord: Word;
  private searchRecords: Observable<SearchRecord[]>;
  private wordsArray: Word[] = [];
  private searchTerms = new Subject<string>();

  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute,
              private wordService: WordService) {
  }

  ngOnInit(): void {
    console.log("WordSetComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((set: WordSet) => {
        this.set = set;
        console.log(this.set);
      });
    this.resetWords();
    this.reinitializeNewWord();
  }

  private resetWords(): void {
    this.searchRecords = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.wordService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<SearchRecord[]>([])
      )
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<SearchRecord[]>([]);
      });
  }

  private search(term: string): void {
    console.log(`search(${term})`);
    this.searchTerms.next(term);
  }

  private startAddingNewWord(text: string, input: HTMLInputElement): void {
    this.resetWords();
    const existingWord = this.wordsArray.find((word: Word) => word.text == text);
    if (!existingWord) {
      this.newWord.text = text;
    } else {
      this.addExistingWord(existingWord, input);
    }
  }

  private cancelAddingNewWord(textInput: HTMLInputElement): void {
    this.reinitializeNewWord();
    textInput.value = null;
  }

  private addNewWord(input: HTMLInputElement): void {
    if (!this.newWord.translation) return;

    this.wordSetService.addWord(this.set.id, this.newWord);
    this.reinitializeNewWord();
    if (input) {
      input.value = null;
    }
    this.searchTerms.next('');
  }


  private addExistingWord(word: Word, searchInput: HTMLInputElement): void {
    this.wordSetService.addWord(this.set.id, word);
    this.resetWords();
    this.reinitializeNewWord();
    searchInput.value = null;
  }

  private removeWord(word: Word): void {
    this.wordSetService.removeWordFromWordSet(this.set.id, word.id);
    this.set.words.splice(this.set.words.indexOf(word), 1);
  }

  private reinitializeNewWord(): void {
    this.newWord = new Word(null, '', '', WordStage.NOT_LEARNED, null, null);
  }
}
