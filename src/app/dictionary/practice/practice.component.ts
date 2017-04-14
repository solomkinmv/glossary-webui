import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {WordSet} from "../_models/word-set";
import {WordSetService} from "../_services/word-set.service";

@Component({
  templateUrl: './practice.component.html'
})
export class PracticeComponent implements OnInit {
  private setId: number;
  private sets: WordSet[];
  private currentSet: WordSet;

  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    console.log("PracticeComponent init");
    this.route.params
      .map((params: Params) => +params['id'])
      .subscribe((id: number) => {
        this.setId = id;
        this.wordSetService.getAll()
          .subscribe((wordSets: WordSet[]) => this.initSets(wordSets));
      })
  }

  private initSets(wordSets: WordSet[]): void {
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
