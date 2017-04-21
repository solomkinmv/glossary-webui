import {Component, OnDestroy, OnInit} from "@angular/core";
import {SpeechRecognitionService} from "../_services/speech-recognition.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {PracticeService} from "../_services/practice.service";
import {WritingTest, WritingTestQuestion} from "../_models/writing-test";
import {Summary} from "../_models/summary";
import {AlertService} from "../../_services/alert.service";

@Component({
  templateUrl: 'pronunciation.component.html'
})

export class PronunciationComponent implements OnInit, OnDestroy {
  // showSearchButton: boolean;
  // speechData: string;
  private recording: boolean;
  private setId: number;
  private writingTest: WritingTest;
  private currentQuestion: WritingTestQuestion;
  private currentIndex = 0;
  private answerText: string = "";
  private answers = new Map<number, boolean>();
  private finished = false;
  private showCorrectAnswer = false;
  private progress: number = 0;
  private correctAnswer: boolean = false;
  private audio = new Audio();

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private speechRecognitionService: SpeechRecognitionService,
              private location: Location,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params
      .switchMap((params: Params) => {
        this.setId = +params['id'];
        return this.practiceService.getWritingTest(this.setId, false);
      })
      .subscribe((writingTest: WritingTest) => {
        this.writingTest = writingTest;
        this.currentQuestion = this.writingTest.questions[this.currentIndex];
        this.initSound();
      });
  }

  ngOnDestroy(): void {
    this.speechRecognitionService.stop();
  }

  private toggleRecording(): void {
    if (this.recording) {
      this.stopRecording();
      return;
    }
    this.startRecording();
  }

  private startRecording() {
    this.recording = true;
    this.speechRecognitionService.record()
      .subscribe(
        (value) => {
          this.answerText = value;
          this.checkAnswer();
        },
        (err) => {
          this.alertService.error(err);
          if (err.error == "no-speech") {
            console.log("restarting speech service");
            this.toggleRecording();
          }
        },
        () => {
          console.log("complete speech record");
          this.stopRecording();
        });
  }

  private stopRecording() {
    this.recording = false;
    this.speechRecognitionService.stop();
  }

  private checkAnswer(): void {
    if (this.currentQuestion.answer.answerText.toLowerCase() === this.answerText.toLowerCase()) {
      this.answer(true);
    }
  }

  private handleFail(): void {
    this.answer(false);
  }

  private answer(correctAnswer: boolean) {
    console.log("Answer: " + correctAnswer);
    this.correctAnswer = correctAnswer;
    this.stopRecording();
    this.currentIndex++;
    this.progress = (this.answers.size / this.writingTest.questions.length) * 100;

    this.answers.set(this.currentQuestion.answer.wordId, correctAnswer);

    this.showCorrectAnswer = true;
    this.playSound();
  }

  private nextWord() {
    this.showCorrectAnswer = false;
    this.currentQuestion = this.writingTest.questions[this.currentIndex];
    if (this.writingTest.questions.length == this.currentIndex) {
      this.finished = true;
      this.handleResults();
      return;
    }

    this.answerText = '';
    this.initSound();
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

  private summary(): Summary {
    let correct: string[] = [];
    let incorrect: string[] = [];

    for (let question of this.writingTest.questions) {
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
