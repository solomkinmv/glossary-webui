import {Component, EventEmitter, Output} from "@angular/core";
import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'add-word-set',
  templateUrl: 'add-word-set.component.html'
})
export class AddWordSetComponent {
  @Output() notify: EventEmitter<WordSet> = new EventEmitter<WordSet>();
  private newWordSet: WordSet = new WordSet();

  constructor(private wordSetService: WordSetService,
              private alertService: AlertService) {
  }

  private addWordSet(): void {
    console.log(this.newWordSet);

    this.wordSetService.createAndGet(this.newWordSet)
      .subscribe(
        (ws: WordSet) => {
          this.notify.emit(ws);
          this.alertService.success("Added new Word Set")
        },
        err => this.alertService.error(err));

    this.newWordSet = new WordSet();
  }

  private stopAddingWordSet(): void {
    this.notify.emit(null);
  }
}
