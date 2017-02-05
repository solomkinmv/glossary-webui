import {Word} from "./Word";

export class StudiedWord {
  id: number;
  word: Word;
  stage: string;

  toString(): string {
    return `StudiedWord(id=${this.id},word=${this.word},stage=${this.stage})`
  }
}
