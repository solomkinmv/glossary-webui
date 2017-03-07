import {Component, OnInit} from "@angular/core";
import {WordSet} from "../dictionary/word-set";
import {ActivatedRoute, Params} from "@angular/router";
import {WordSetService} from "../_services/word-set.service";
import {StudiedWord} from "./studied-word";

@Component({
  templateUrl: 'write-practice.component.html'
})
export class WritePracticeComponent implements OnInit {
  wordSet: WordSet;
  currentWord: StudiedWord;

  constructor(private route: ActivatedRoute,
              private wordSetService: WordSetService) {
  }

  ngOnInit(): void {
    console.log("WritePracticeComponent init");
    this.route.params
      .switchMap((params: Params) => this.wordSetService.get(+params['id']))
      .subscribe((wordSet: WordSet) => this.wordSet = wordSet);
  }
}
