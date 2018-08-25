import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {PracticeService, PracticeType} from "../_services/practice.service";
import {Summary} from "../_models/summary";
import {combineLatest} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {GenericTest, GenericTestWord} from "../_models/generic-test";

@Component({
  templateUrl: 'repetition-practice.component.html'
})
export class RepetitionPracticeComponent implements OnInit {
  public setId: number;
  public currentWord: GenericTestWord;
  private currentIndex = 0;
  private answers = new Map<number, boolean>();
  public finished = false;
  public showCorrectAnswer = false;
  public progress: number = 0;
  private audio = new Audio();
  public words: GenericTestWord[];
  private originQuestions: any;

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("RepetitionPracticeComponent init");
    combineLatest(this.route.params, this.route.queryParams)
      .pipe(
        map(result => ({params: result[0], qparams: result[1]})),
        switchMap(ap => {
          this.setId = +ap.params['id'];
          this.originQuestions = ap.qparams['originQuestions'];
          return this.practiceService.genericTest(this.setId, true, PracticeType.LEARNED_FIRST);
        }))
      .subscribe((genericTest: GenericTest) => {
        this.words = genericTest.words;
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
    this.answers.set(this.currentWord.wordId, value);
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
      let isCorrect = this.answers.get(word.wordId);
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
