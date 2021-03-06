import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WritingTest, WritingTestQuestion} from "../_models/writing-test";
import {PracticeService} from "../_services/practice.service";
import {Summary} from "../_models/summary";
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: 'write-practice.component.html'
})
export class WritePracticeComponent implements OnInit {
  private setId: number;
  private writingTest: WritingTest;
  private currentQuestion: WritingTestQuestion;
  private currentIndex = 0;
  private answerText: string;
  private answers = new Map<number, boolean>();
  private finished = false;
  private showCorrectAnswer = false;
  private progress: number = 0;
  private correctAnswer: boolean = false;
  private audio = new Audio();
  private summary: Summary = new Summary([], []);

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({params, qparams}))
      .switchMap(ap => {
        this.setId = +ap.params['id'];
        let originQuestions = ap.qparams['originQuestions'];
        return this.practiceService.getWritingTest(this.setId, originQuestions);
      })
      .subscribe((writingTest: WritingTest) => {
        this.writingTest = writingTest;
        this.currentQuestion = this.writingTest.questions[this.currentIndex];
        this.initSound();
      });
  }

  private answer() {
    this.updateProgress();
    this.correctAnswer = this.currentQuestion.answer.answerText === this.answerText;
    if (!this.answers.has(this.currentQuestion.answer.wordId)) {
      this.answers.set(this.currentQuestion.answer.wordId, this.correctAnswer);
    }

    this.showCorrectAnswer = true;
    this.playSound();

    if (this.correctAnswer) {
      this.writingTest.questions.splice(this.currentIndex, 1);

      this.updateSummary();
    } else {
      this.currentIndex++;
    }

    this.updateProgress();
  }

  private updateSummary() {
    if (this.answers.get(this.currentQuestion.answer.wordId)) {
      this.summary.correct.push(this.currentQuestion.questionText);
    } else {
      this.summary.incorrect.push(this.currentQuestion.questionText);
    }
  }

  private updateProgress() {
    this.progress = (this.answers.size / (this.answers.size + this.writingTest.questions.length)) * 100;
  }

  private nextWord() {
    this.showCorrectAnswer = false;
    this.answerText = '';
    this.currentIndex %= this.writingTest.questions.length;
    this.currentQuestion = this.writingTest.questions[this.currentIndex];
    if (this.currentQuestion != null) {
      this.initSound();
    }


    if (this.writingTest.questions.length == 0) {
      this.finished = true;
      this.handleResults();
    }
  }

  private initSound(): void {
    this.audio.src = this.currentQuestion.answer.pronunciation;
    this.audio.load();
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
}
