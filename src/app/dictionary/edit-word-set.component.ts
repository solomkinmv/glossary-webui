import {Component, EventEmitter, Input, Output} from "@angular/core";
import {WordSet} from "./_models/word-set";
import {WordSetService} from "./_services/word-set.service";
import {AlertService} from "../_services/alert.service";
import {WordSetMeta} from "./_models/word-set-meta";

@Component({
  selector: 'add-word-set',
  templateUrl: 'edit-word-set.component.html'
})
export class EditWordSetComponent {
  @Output() notify: EventEmitter<WordSet> = new EventEmitter<WordSet>();
  @Input() wordSet: WordSet;

  constructor(private wordSetService: WordSetService,
              private alertService: AlertService) {
  }

  private saveChanges(): void {
    console.log(this.wordSet);

    if (this.wordSet.id) {
      this.updateWordSet();
    } else {
      this.addWordSet();
    }
  }

  private addWordSet() {
    this.wordSetService.createAndGet(this.wordSet)
      .subscribe(
        (ws: WordSet) => {
          this.cancel();
          this.alertService.success("Added new Word Set: " + ws.name)
        },
        err => this.alertService.error(err));
  }

  private updateWordSet() {
    this.wordSetService.update(this.wordSet.id, new WordSetMeta(this.wordSet.name, this.wordSet.description))
      .subscribe(
        data => {
          this.alertService.success("Added new Word Set: " + data)
        },
        err => this.alertService.error(err));
    this.cancel();
  }

  private cancel(): void {
    this.notify.emit(this.wordSet);
  }
}
