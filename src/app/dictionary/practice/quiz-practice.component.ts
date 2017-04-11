import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {PracticeService} from "../_services/practice.service";
import {Quiz, QuizQuestion} from "../_models/quiz";

@Component({
  templateUrl: 'quiz-practice.component.html'
})
export class QuizPracticeComponent implements OnInit {
  private quiz: Quiz;
  private currentIndex = 0;
  private currentQuestion: QuizQuestion;
  private highlightOnAnswer = new Map<string, string>();
  private successHighlighting = "list-group-item-success";
  private dangerHighlighting = "list-group-item-danger";
  private answers = new Map<number, boolean>();
  private alreadyAnswered: boolean = false;
  private finished: boolean = false;
  private progress: number = 0;

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("QuizPracticeComponent init");
    this.route.params
      .switchMap((params: Params) => this.practiceService.getQuiz(+params['id']))
      .subscribe((quiz: Quiz) => {
        this.quiz = quiz;
        this.currentQuestion = this.quiz.questions[this.currentIndex];
      })
  }

  private answer(alternative: string) {
    if (this.alreadyAnswered) {
      return;
    }
    this.alreadyAnswered = true;
    let testAnswer = this.currentQuestion.answer;
    let correctAnswer = testAnswer.answerText === alternative;
    this.answers.set(testAnswer.wordId, correctAnswer);
    if (!correctAnswer) {
      this.highlightOnAnswer.set(alternative, this.dangerHighlighting);
    }
    this.highlightOnAnswer.set(testAnswer.answerText, this.successHighlighting);
  }

  private nextQuestion() {
    this.currentIndex++;
    this.progress = (this.answers.size / this.quiz.questions.length) * 100;
    this.currentQuestion = this.quiz.questions[this.currentIndex];
    this.alreadyAnswered = false;

    if (this.currentIndex == this.quiz.questions.length) {
      this.finished = true;
      this.handleResults();
      return;
    }
    this.highlightOnAnswer = new Map<string, string>();
  }

  private handleResults(): void {
    this.practiceService.handleResults(this.answers)
      .subscribe();
  }

  private goBack(): void {
    this.location.back();
  }
}
