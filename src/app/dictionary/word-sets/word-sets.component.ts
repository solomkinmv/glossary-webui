import {Component, OnInit} from '@angular/core';
import {WordSetsService} from "../_services/word-sets.service";
import {Observable, Subject} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {WordSetMeta} from "../_models/word-set-meta";
import {AlertService} from "../../_services/alert.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-word-sets',
  templateUrl: './word-sets.component.html',
  styleUrls: ['./word-sets.component.css']
})
export class WordSetsComponent implements OnInit {

  public sets: WordSetMeta[];
  public set: WordSetMeta;

  constructor(private wordSetsService: WordSetsService,
              private keycloak: KeycloakService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.wordSetsService.getAll()
      .subscribe(sets => this.sets = sets);
  }

  private startAddingWordSet(): void {
    this.set = new WordSetMeta();
  }

  private editWordSet(wordSet: WordSetMeta): void {
    this.set = wordSet;
  }

  private deleteWordSet(wordSet: WordSetMeta): void {
    this.wordSetsService.remove(wordSet.id)
      .subscribe(id => {
          this.alertService.success("Removed Word Set");
          this.sets = this.sets.filter(set => set.id != id);
        },
        err => this.alertService.error(err));
  }

  public onNotify(wordSet: WordSetMeta) {
    console.log("on notify");
    console.log(wordSet);
    this.set = null;
    if (wordSet != null) {
      this.sets.push(wordSet);
    }
  }

}
