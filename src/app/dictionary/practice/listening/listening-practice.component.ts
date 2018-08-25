import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {PracticeService} from "../_services/practice.service";
import {Location} from "@angular/common";
import {Summary} from "../_models/summary";
import {switchMap} from "rxjs/operators";
import {GenericTest, GenericTestWord} from "../_models/generic-test";

@Component({
  templateUrl: 'listening-practice.component.html'
})
export class ListeningPracticeComponent implements OnInit {
  public setId: number;
  public genericTest: GenericTest;
  public currentQuestion: GenericTestWord;
  private currentIndex = 0;
  public answerText: string;
  private answers = new Map<number, boolean>();
  public finished = false;
  public showCorrectAnswer = false;
  public progress: number = 0;
  public correctAnswer: boolean = false;
  private audio = new Audio();
  public summary: Summary = new Summary([], []);

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.setId = +params['id'];
        return this.practiceService.genericTest(this.setId, false);
      }))
      .subscribe((genericTest: GenericTest) => {
        this.genericTest = genericTest;
        this.currentQuestion = this.genericTest.words[this.currentIndex];
        this.initSound();
      });
  }

  private answer() {
    this.updateProgress();
    this.correctAnswer = this.currentQuestion.translation === this.answerText;
    if (!this.answers.has(this.currentQuestion.wordId)) {
      this.answers.set(this.currentQuestion.wordId, this.correctAnswer);
    }

    this.showCorrectAnswer = true;
    this.playSound();

    if (this.correctAnswer) {
      this.genericTest.words.splice(this.currentIndex, 1);

      this.updateSummary();
    } else {
      this.currentIndex++;
    }

    this.updateProgress();
  }

  private updateSummary() {
    if (this.answers.get(this.currentQuestion.wordId)) {
      this.summary.correct.push(this.currentQuestion.text);
    } else {
      this.summary.incorrect.push(this.currentQuestion.text);
    }
  }

  private updateProgress() {
    this.progress = (this.answers.size / (this.answers.size + this.genericTest.words.length)) * 100;
  }

  private nextWord() {
    this.showCorrectAnswer = false;

    this.answerText = '';
    this.currentIndex %= this.genericTest.words.length;
    this.currentQuestion = this.genericTest.words[this.currentIndex];
    if (this.currentQuestion != null) {
      this.initSound();
    }

    if (this.genericTest.words.length == 0) {
      this.finished = true;
      this.handleResults();
    }
  }

  private initSound(): void {
    this.audio.src = this.currentQuestion.sound;
    this.audio.load();
    this.playSound();
  }

  private playSound(): void {
    this.audio.play();
  }

  private handleResults(): void {
    this.practiceService.handleResults(this.answers)
      .subscribe();
  }

  private goBack(): void {
    this.location.back();
  }
}
