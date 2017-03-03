import {Component, OnInit} from "@angular/core";
import {WordSet} from "./word-set";
import {WordSetService} from "./word-set.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  wordSet: WordSet;

  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("WordSetComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((wordSet: WordSet) => {
        this.wordSet = wordSet;
        console.log(this.wordSet);
      });
  }
}
