import {Component, OnInit} from "@angular/core";
import {WordSet} from "./word-set";
import {WordSetService} from "../_services/word-set.service";
import {ActivatedRoute, Params} from "@angular/router";
import {WordService} from '../_services/word.service';
import {Word} from './word';

@Component({
  templateUrl: './word-set.component.html'
})
export class WordSetComponent implements OnInit {
  private wordSet: WordSet;
  private newWordText: string;
  private newWordTranslation: string;


  constructor(private wordSetService: WordSetService,
              private route: ActivatedRoute,
              private wordService: WordService) {
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

  addWord(): void {
    const word = new Word(null, this.newWordText, this.newWordTranslation); 
    this.wordService.add(word)
      .then((newWordId: number) => {
        word.id = newWordId;
        console.log({word});  
        return this.wordSetService.addWord(this.wordSet, word);
      })
      .then((wordSet: WordSet) => {
        this.wordSet = wordSet;
      })
      .catch((err) => console.log(err));
  }

}
