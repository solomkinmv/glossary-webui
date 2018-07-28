import {Word} from "./word";

export class WordSet {
  id: number;
  name: string;
  description: string;
  words: Array<Word>;

  toString(): string {
    return `WordSet(id=${this.id},name=${this.name},description=${this.description},words=${this.words})`;
  }
}
