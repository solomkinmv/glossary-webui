export class Word {
  id: number;
  text: string;
  translation: string;

  toString(): string {
    return `Word(id=${this.id},text=${this.text},translation=${this.translation})`;
  }
}
