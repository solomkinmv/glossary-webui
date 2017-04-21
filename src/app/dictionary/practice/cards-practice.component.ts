import {Component, HostListener, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute, Params} from "@angular/router";
import {Word} from "../_models/word";
import {WordSet} from "../_models/word-set";
import {WordSetService} from "../_services/word-set.service";
import {KeyCodes} from "../../_util/key-codes";
import {WordService} from "../_services/word.service";

@Component({
  templateUrl: 'cards-practice.component.html',
  styleUrls: ['cards-practice.component.scss']
})
export class CardsPracticeComponent implements OnInit {
  private words: Word[];
  private currentWord: Word;
  private currentIndex = 0;
  private progress: number = 0;
  private soundMap: Map<Word, any> = new Map<Word, any>();
  private flip: boolean = false;
  private keyActions: Map<number, () => void> = new Map<number, () => void>();

  constructor(private route: ActivatedRoute,
              private wordSetService: WordSetService,
              private wordService: WordService,
              private location: Location) {
    this.keyActions.set(KeyCodes.DOWN, () => this.makeFlip());
    this.keyActions.set(KeyCodes.UP, () => this.makeFlip());
    this.keyActions.set(KeyCodes.RIGHT, () => this.next());
    this.keyActions.set(KeyCodes.LEFT, () => this.previous());
  }

  ngOnInit(): void {
    console.log("CardsPracticeComponent init");
    this.route.params
      .subscribe((params: Params) => {
        let setId = +params['id'];
        if (setId) {
          this.wordSetService.get(setId)
            .subscribe((wordSet: WordSet) => {
              this.words = wordSet.words;
              this.initCurrentWord();
            })
        } else {
          this.wordService.getAll()
            .subscribe((words: Word[]) => {
              this.words = words;
              this.initCurrentWord();
            });
        }
      });
  }

  private initCurrentWord() {
    this.currentWord = this.words[this.currentIndex];
    this.playSound();
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent): void {
    console.log(event.key);
    let action = this.keyActions.get(event.keyCode);
    if (action) {
      action();
    }
  }

  private updateWord() {
    this.updateProgress();
    this.flip = false;
    this.currentWord = this.words[this.currentIndex];
    this.playSound();
  }

  private updateProgress() {
    this.progress = (this.currentIndex / this.words.length) * 100;
  }

  private next(): void {
    if (this.currentIndex == this.words.length - 1) {
      return;
    }
    this.currentIndex++;
    this.updateWord();
  }

  private previous(): void {
    if (this.currentIndex == 0) {
      return;
    }
    this.currentIndex--;
    this.updateWord();
  }

  private makeFlip(): void {
    this.flip = !this.flip;
  }

  private playSound() {
    if (this.soundMap.has(this.currentWord)) {
      this.soundMap.get(this.currentWord).play();
      return;
    }

    let audio = new Audio();
    audio.src = this.currentWord.sound;
    audio.load();
    audio.play();
    this.soundMap.set(this.currentWord, audio);
  }

  private goBack(): void {
    this.location.back();
  }
}
