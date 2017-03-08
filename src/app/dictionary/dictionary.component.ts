import {OnInit, Component} from "@angular/core";
import {TokenHolder} from "../_models/TokenHolder";
import {WordSet} from "./word-set";
import {DictionaryService} from "../_services/dictionary.service";
import {Dictionary} from "./dictionary";

@Component({
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  tokenHolder: TokenHolder;
  wordSets: Array<WordSet>;

  constructor(private dictionaryService: DictionaryService) {
    this.tokenHolder = JSON.parse(localStorage.getItem('tokenHolder'));
  }

  ngOnInit() {
    this.dictionaryService.get()
      .then((dictionary: Dictionary) => this.wordSets = dictionary.wordSets);
  }
}
