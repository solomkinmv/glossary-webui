import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {WordSet} from "../_models/word-set";
import {Word} from "../_models/word";
import {AlertService} from "../../_services/alert.service";
import {WordSetsService} from "../_services/word-sets.service";
import {switchMap} from "rxjs/operators";

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  public set: WordSet;
  private soundMap: Map<Word, any> = new Map<Word, any>();

  constructor(private wordSetService: WordSetsService,
              private route: ActivatedRoute,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log("WordSetComponent init");
    this.route.params
      .pipe(
        switchMap((params: Params) => this.wordSetService.get(+params['id']))
      )
      .subscribe((set: WordSet) => {
        this.set = set;
        console.log(this.set);
      });
  }

  private removeWord(word: Word): void {
    this.wordSetService.removeWordFromWordSet(this.set.id, word.id)
      .subscribe(
        _ => {
          this.alertService.success("Removed word");
          this.set.words.splice(this.set.words.indexOf(word), 1);
        },
        err => this.alertService.error(err)
      );
  }

  private playSound(word: Word): void {
    if (this.soundMap.has(word)) {
      this.soundMap.get(word).play();
      return;
    }

    let audio = new Audio();
    audio.src = word.sound;
    audio.load();
    audio.play();
    this.soundMap.set(word, audio);
  }
}
