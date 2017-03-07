import {Component, OnInit} from "@angular/core";
import {WordSet} from "../dictionary/word-set";
import {ActivatedRoute, Params} from "@angular/router";
import {WordSetService} from "../_services/word-set.service";
import {StudiedWord} from "./studied-word";

@Component({
  templateUrl: 'write-practice.component.html'
})
export class WritePracticeComponent implements OnInit {
  wordSet: WordSet;
  currentIndex = 0;
  currentWord: StudiedWord;
  currentTranslation: string = '';
  isWrong : boolean;

  mistakes : Set<number> = new Set<number>();

  constructor(private route: ActivatedRoute,
              private wordSetService: WordSetService) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((wordSet: WordSet) => {
        this.wordSet = wordSet;
        this.currentWord = this.wordSet.studiedWords[this.currentIndex];
      });
  }

  answer() {
    if (this.currentWord.word.translation === this.currentTranslation) {
      this.nextWord();
    } else {
      this.isWrong = true;
      this.mistakes.add(this.currentWord.id);
    }
    
  }

  private nextWord() {
    this.isWrong = false;
    this.currentTranslation = '';
    this.currentIndex++;
    if(this.currentIndex < this.wordSet.studiedWords.length) {
      this.currentWord = this.wordSet.studiedWords[this.currentIndex];
    } else {
      this.currentWord = null;
    }
  }
}
