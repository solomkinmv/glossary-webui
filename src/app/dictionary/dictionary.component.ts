import {OnInit, Component} from "@angular/core";
import {TokenHolder} from "../_models/TokenHolder";
import {WordSet} from "./word-set";
import {WordSetService} from "./word-set.service";

@Component({
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  tokenHolder: TokenHolder;
  wordSets: Array<WordSet>;

  constructor(private wordSetService: WordSetService) {
    this.tokenHolder = JSON.parse(localStorage.getItem('tokenHolder'));
  }

  ngOnInit() {
    this.wordSetService.getAll()
      .then((wordSets: Array<WordSet>) => this.wordSets = wordSets);
  }
}
