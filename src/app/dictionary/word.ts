export class Word {
	constructor(public id: number,
	 						public text: string,
	 						public translation: string) {
	}

  toString(): string {
    return `Word(id=${this.id},text=${this.text},translation=${this.translation})`;
  }
}
