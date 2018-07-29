import {Word} from "./word";

export class WordSet {

  constructor(public id: number,
              public name: string,
              public description: string,
              public words: Array<Word>) {
  }


  toString(): string {
    return `WordSet(id=${this.id},name=${this.name},description=${this.description},words=${this.words})`;
  }
}
