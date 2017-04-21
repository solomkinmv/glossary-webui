import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {PracticeService} from "../_services/practice.service";
import {Summary} from "../_models/summary";
import {Word} from "../_models/word";
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: 'repetition-practice.component.html'
})
export class RepetitionPracticeComponent implements OnInit {
  private setId: number;
  private currentWord: Word;
  private currentIndex = 0;
  private answers = new Map<number, boolean>();
  private finished = false;
  private showCorrectAnswer = false;
  private progress: number = 0;
  private audio = new Audio();
  private words: Word[];
  private originQuestions: any;

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("RepetitionPracticeComponent init");
    Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({params, qparams}))
      .switchMap(ap => {
        this.setId = +ap.params['id'];
        this.originQuestions = ap.qparams['originQuestions'];
        return this.practiceService.getWordsForRepetition(this.setId);
      })
      .subscribe((words: Word[]) => {
        this.words = words;
        this.currentWord = this.words[this.currentIndex];
        this.initSound();
      });
  }

  private nextWord() {
    this.showCorrectAnswer = false;
    this.currentIndex++;
    this.updateProgress();
    this.currentWord = this.words[this.currentIndex];
    if (!this.currentWord) {
      this.finished = true;
      this.handleResults();
      return;
    }

    this.initSound();
  }

  private updateProgress() {
    this.progress = (this.currentIndex / this.words.length) * 100;
  }

  private check() {
    this.showCorrectAnswer = true;
    this.playSound();
  }

  private markAsCorrect() {
    this.markAs(true);
  }

  private markAsWrong() {
    this.markAs(false);
  }

  private markAs(value: boolean) {
    this.answers.set(this.currentWord.id, value);
    this.nextWord();
  }

  private initSound(): void {
    if (this.currentWord) {
      this.audio.src = this.currentWord.sound;
      this.audio.load();
    }
  }

  private playSound() {
    this.audio.play();
  }

  private handleResults(): void {
    this.practiceService.handleResults(this.answers)
      .subscribe();
  }

  private goBack(): void {
    this.location.back();
  }

  private summary(): Summary {
    let correct: string[] = [];
    let incorrect: string[] = [];

    for (let word of this.words) {
      let isCorrect = this.answers.get(word.id);
      let text = word.text;
      if (isCorrect) {
        correct.push(text);
      } else {
        incorrect.push(text)
      }
    }

    return new Summary(correct, incorrect);
  }
}
