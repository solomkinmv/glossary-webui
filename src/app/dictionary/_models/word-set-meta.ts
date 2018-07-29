export class WordSetMeta {

  constructor(public id: number = null,
              public name: string = null,
              public description: string = null,
              public numberOfWords: number = null) {
  }

  toString(): string {
    return `WordSetMeta(name=${this.name},description=${this.description},numberOfWords=${this.numberOfWords}`;
  }
}
