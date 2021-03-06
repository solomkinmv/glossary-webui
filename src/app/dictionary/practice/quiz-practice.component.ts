import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {PracticeService} from "../_services/practice.service";
import {Quiz, QuizQuestion} from "../_models/quiz";
import {Summary} from "../_models/summary";
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: 'quiz-practice.component.html'
})
export class QuizPracticeComponent implements OnInit {
  private setId: number;
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
  private audio = new Audio();

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("QuizPracticeComponent init");
    Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({params, qparams}))
      .switchMap(ap => {
        this.setId = +ap.params['id'];
        let originQuestions = ap.qparams['originQuestions'];
        return this.practiceService.getQuiz(this.setId, originQuestions);
      })
      .subscribe((quiz: Quiz) => {
        this.quiz = quiz;
        this.currentQuestion = this.quiz.questions[this.currentIndex];
        this.initSound();
      })
  }

  private answer(alternative: string) {
    if (this.alreadyAnswered) {
      return;
    }
    this.alreadyAnswered = true;
    this.playSound();
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
    this.initSound();
    this.highlightOnAnswer = new Map<string, string>();
  }

  private handleResults(): void {
    this.practiceService.handleResults(this.answers)
      .subscribe();
  }

  private initSound(): void {
    this.audio.src = this.currentQuestion.answer.pronunciation;
    this.audio.load();
  }

  private playSound() {
    this.audio.play();
  }

  private goBack(): void {
    this.location.back();
  }

  private summary(): Summary {
    let correct: string[] = [];
    let incorrect: string[] = [];

    for (let question of this.quiz.questions) {
      let isCorrect = this.answers.get(question.answer.wordId);
      let text = question.questionText;
      if (isCorrect) {
        correct.push(text);
      } else {
        incorrect.push(text)
      }
    }

    return new Summary(correct, incorrect);
  }
}
