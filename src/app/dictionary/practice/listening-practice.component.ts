import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {WritingTest, WritingTestQuestion} from "../_models/writing-test";
import {PracticeService} from "../_services/practice.service";
import {Location} from "@angular/common";

@Component({
  templateUrl: 'listening-practice.component.html'
})
export class ListeningPracticeComponent implements OnInit {
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

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params
      .switchMap((params: Params) => this.practiceService.getWritingTest(+params['id']))
      .subscribe((writingTest: WritingTest) => {
        this.writingTest = writingTest;
        this.currentQuestion = this.writingTest.questions[this.currentIndex];
        this.initSound();
      });
  }

  private answer() {
    this.updateProgress();
    let testAnswer = this.currentQuestion.answer.answerText === this.answerText;

    this.showCorrectAnswer = true;
    this.playSound();
    if (testAnswer) {
      this.correctAnswer = true;
      if (!this.answers.has(this.currentQuestion.answer.wordId)) {
        this.answers.set(this.currentQuestion.answer.wordId, testAnswer);
      }

      this.writingTest.questions.splice(this.currentIndex, 1);
    } else {
      this.correctAnswer = false;
      this.answers.set(this.currentQuestion.answer.wordId, false);
      this.currentIndex++;
      return;
    }

    this.updateProgress();
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
    this.playSound();
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