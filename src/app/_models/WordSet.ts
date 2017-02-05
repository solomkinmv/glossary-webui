import {StudiedWord} from "./StudiedWord";

export class WordSet {
  id: number;
  name: string;
  description: string;
  studiedWords: Array<StudiedWord>;

  toString(): string {
    return `WordSet(id=${this.id},name=${this.name},description=${this.description},studiedWords=${this.studiedWords})`;
  }
}
