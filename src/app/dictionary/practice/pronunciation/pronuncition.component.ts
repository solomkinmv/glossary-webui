import {Component, OnDestroy, OnInit} from "@angular/core";
import {SpeechRecognitionService} from "../_services/speech-recognition.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {PracticeService} from "../_services/practice.service";
import {Summary} from "../_models/summary";
import {AlertService} from "../../../_services/alert.service";
import {switchMap} from "rxjs/operators";
import {GenericTest, GenericTestWord} from "../_models/generic-test";

@Component({
  templateUrl: 'pronunciation.component.html'
})

export class PronunciationComponent implements OnInit, OnDestroy {
  public recording: boolean;
  public setId: number;
  public genericTest: GenericTest;
  public currentWord: GenericTestWord;
  private currentIndex = 0;
  public answerText: string = "";
  private answers = new Map<number, boolean>();
  public finished = false;
  public showCorrectAnswer = false;
  public progress: number = 0;
  public correctAnswer: boolean = false;
  private audio = new Audio();

  constructor(private route: ActivatedRoute,
              private practiceService: PracticeService,
              private speechRecognitionService: SpeechRecognitionService,
              private location: Location,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.setId = +params['id'];
        return this.practiceService.genericTest(this.setId, true);
      }))
      .subscribe((genericTest: GenericTest) => {
        this.genericTest = genericTest;
        this.currentWord = this.genericTest.words[this.currentIndex];
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
    if (this.currentWord.text.toLowerCase() === this.answerText.toLowerCase()) {
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
    this.progress = (this.answers.size / this.genericTest.words.length) * 100;

    this.answers.set(this.currentWord.wordId, correctAnswer);

    this.showCorrectAnswer = true;
    this.playSound();
  }

  private nextWord() {
    this.showCorrectAnswer = false;
    this.currentWord = this.genericTest.words[this.currentIndex];
    if (this.genericTest.words.length == this.currentIndex) {
      this.finished = true;
      this.handleResults();
      return;
    }

    this.answerText = '';
    this.initSound();
  }

  private initSound(): void {
    this.audio.src = this.currentWord.sound;
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

  private summary(): Summary {
    let correct: string[] = [];
    let incorrect: string[] = [];

    for (let word of this.genericTest.words) {
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
