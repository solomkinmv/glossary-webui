import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {WritingTest, WritingTestQuestion} from "../_models/writing-test";
import {PracticeService} from "../_services/practice.service";

@Component({
  templateUrl: 'cards-practice.component.html'
})
export class CardsPracticeComponent implements OnInit {
  private writingTest: WritingTest;
  private currentQuestion: WritingTestQuestion;
  private currentIndex = 0;
  private answers = new Map<number, boolean>();
  private finished = false;
  private showCorrectAnswer = false;
  private progress: number = 0;
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

  private nextWord() {
    this.showCorrectAnswer = false;
    this.currentIndex++;
    this.updateProgress();
    this.currentQuestion = this.writingTest.questions[this.currentIndex];
    if (!this.currentQuestion) {
      this.finished = true;
      this.handleResults();
      return;
    }

    this.initSound();
  }

  private updateProgress() {
    this.progress = (this.currentIndex / this.writingTest.questions.length) * 100;
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
    this.answers.set(this.currentQuestion.answer.wordId, value);
    this.nextWord();
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
