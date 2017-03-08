import {WordSet} from "./word-set";

export class Dictionary {
  id: number;
  wordSets: Array<WordSet>;

  toString(): string {
    return `Dictionary(id=${this.id},wordSets=${this.wordSets})`;
  }
}
