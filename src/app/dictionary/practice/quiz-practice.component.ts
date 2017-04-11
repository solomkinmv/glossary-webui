import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
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

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService) {
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
    this.currentQuestion = this.quiz.questions[this.currentIndex];
    this.alreadyAnswered = false;

    if (this.currentIndex == this.quiz.questions.length) {
      this.finished = true;
      return;
    }
    this.highlightOnAnswer = new Map<string, string>();
  }
}
