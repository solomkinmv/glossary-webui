import {Component, OnInit} from "@angular/core";
import {WordSet} from "./_models/word-set";
import {ActivatedRoute, Params} from "@angular/router";
import {WordSetService} from "./_services/word-set.service";
import {Word} from "./_models/word";

@Component({
  templateUrl: 'write-practice.component.html'
})
export class WritePracticeComponent implements OnInit {
  set: WordSet;
  currentIndex = 0;
  currentWord: Word;
  currentTranslation = '';
  isWrong: boolean;

  mistakes = new Set<number>();

  constructor(private route: ActivatedRoute,
              private wordSetService: WordSetService) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((set: WordSet) => {
        this.set = set;
        this.currentWord = this.set.words[this.currentIndex];
      });
  }

  private answer() {
    if (this.currentWord.translation === this.currentTranslation) {
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
    if (this.currentIndex < this.set.words.length) {
      this.currentWord = this.set.words[this.currentIndex];
    } else {
      this.currentWord = null;
    }
  }
}
