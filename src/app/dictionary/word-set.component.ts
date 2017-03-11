import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

import {WordSet} from "./word-set";
import {WordSetService} from "../_services/word-set.service";
import {WordService} from '../_services/word.service';
import {Word} from './word';
import {StudiedWord} from './studied-word';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  private wordSet: WordSet;
  private newWord = new Word(null,'','');
  private words: Observable<Word[]>;
  private wordsArray: Word[] = new Array<Word>();
  private searchTerms = new Subject<string>();

  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute,
              private wordService: WordService) {
  }

  ngOnInit(): void {
    console.log("WordSetComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((wordSet: WordSet) => {
        this.wordSet = wordSet;
        console.log(this.wordSet);
      });
    this.resetWords();    
  }

  resetWords(): void {
   this.words = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.wordService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Word[]>([]))
      .switchMap((words : Word[]) => {
        this.wordsArray = words.slice(0,5);
        return Observable.of<Word[]>(this.wordsArray);
      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Word[]>([]);
      }); 
  }



  search(term: string): void {
    console.log('search')
    this.searchTerms.next(term);
  }

  startAddingNewWord(text: string, input: HTMLInputElement):void {
    this.resetWords();
    const existingWord = this.wordsArray.find((word: Word) => word.text == text);
    if(!existingWord) {
      this.newWord.text = text;
    } else {
      this.addExistingWord(existingWord);
      input.value = null;
    }
  }

  addNewWord(input: HTMLInputElement): void {
    this.wordService.add(this.newWord)
      .then((newWordId: number) => {
        this.newWord.id = newWordId;
        return this.wordSetService.addWord(this.wordSet, this.newWord);
      })
      .then((wordSet: WordSet) => {
        this.wordSet = wordSet;
        this.newWord = new Word(null,'','');
        if(input) {
          input.value = null;
        }
      })
      .catch((err) => console.log(err))
      .then(() => this.searchTerms.next(''));
  }

  addExistingWord(word: Word): void {
    this.wordSetService.addWord(this.wordSet, word)
      .then((wordSet: WordSet) => {
        this.wordSet = wordSet;
      })
      .catch((err) => console.log(err))
      .then(() => {
        this.searchTerms.next('');
        this.newWord = new Word(null,'','');

      });
  }

  removeWord(studiedWord: StudiedWord): void {
    this.wordSetService.removeWord(this.wordSet, studiedWord)
      .then(() => {
        this.wordSet.studiedWords = this.wordSet.studiedWords.filter(v => v !== studiedWord);
      })
      .catch(console.log);
  }


}
