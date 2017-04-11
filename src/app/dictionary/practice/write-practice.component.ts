import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {WritingTest, WritingTestQuestion} from "../_models/writing-test";
import {PracticeService} from "../_services/practice.service";

@Component({
  templateUrl: 'write-practice.component.html'
})
export class WritePracticeComponent implements OnInit {
  private writingTest: WritingTest;
  private currentQuestion: WritingTestQuestion = new WritingTestQuestion(null, null);
  private currentIndex = 0;
  private answerText: string;
  private answers = new Map<number, boolean>();
  private finished = false;
  private showCorrectAnswer = false;


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
      });
  }

  private answer() {
    if (this.currentQuestion.answer.answerText === this.answerText) {
      this.answers.set(this.currentQuestion.answer.wordId, false);
      this.writingTest.questions.splice(this.currentIndex, 1);
    } else {
      this.answers.set(this.currentQuestion.answer.wordId, false);
      this.currentIndex++;
      this.showCorrectAnswer = true;
      return;
    }

    if (this.writingTest.questions.length > 0) {
      this.nextWord();
    } else {
      this.finished = true;
      this.handleResults();
    }
  }

  private nextWord() {
    this.showCorrectAnswer = false;
    this.answerText = '';
    this.currentIndex %= this.writingTest.questions.length;
    this.currentQuestion = this.writingTest.questions[this.currentIndex];
    if (this.currentQuestion == null) {
      console.log(this.writingTest);
    }
  }

  private handleResults(): void {
    this.practiceService.handleResults(this.answers)
      .subscribe();
  }

  private goBack(): void {
    this.location.back();
  }
}
