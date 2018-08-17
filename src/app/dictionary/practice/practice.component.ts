import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {WordSetsService} from "../_services/word-sets.service";
import {WordSetMeta} from "../_models/word-set-meta";
import {map} from "rxjs/operators";

@Component({
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  public setId: number;
  public sets: WordSetMeta[];
  public currentSet: WordSetMeta;

  constructor(private wordSetsService: WordSetsService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("PracticeComponent init");
    this.route.params
      .pipe(
        map((params: Params) => +params['id'])
      )
      .subscribe((id: number) => {
        this.setId = id;
        this.wordSetsService.getAll()
          .subscribe((wordSets: WordSetMeta[]) => this.initSets(wordSets));
      });
  }

  private initSets(wordSets: WordSetMeta[]): void {
    console.log(`Initializing sets: ${JSON.stringify(wordSets)}`);
    let sets = [];
    for (let set of wordSets) {
      if (set.id == this.setId) {
        this.currentSet = set;
        continue;
      }

      sets.push(set);
    }

    this.sets = sets;
  }

  private goBack(): void {
    this.location.back();
  }
}
