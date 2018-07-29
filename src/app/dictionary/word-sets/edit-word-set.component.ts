import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AlertService} from "../../_services/alert.service";
import {WordSetsService} from "../_services/word-sets.service";
import {WordSetMeta} from "../_models/word-set-meta";

@Component({
  selector: 'add-word-set',
  templateUrl: 'edit-word-set.component.html'
})
export class EditWordSetComponent {
  @Output() notify: EventEmitter<WordSetMeta> = new EventEmitter<WordSetMeta>();
  @Input() wordSet: WordSetMeta;

  constructor(private wordSetService: WordSetsService,
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
    this.wordSetService.create(this.wordSet)
      .subscribe(
        set => {
          this.notify.emit(set);
          this.alertService.success("Added new Word Set: " + set.name)
        },
        err => this.alertService.error(err));
  }

  private updateWordSet() {
    this.wordSetService.update(this.wordSet)
      .subscribe(
        set => {
          this.notify.emit(set);
          this.alertService.success("Updated Word Set: " + set.name)
        },
        err => this.alertService.error(err));
  }

  private cancel() {
    this.notify.emit(null);
  }

}
