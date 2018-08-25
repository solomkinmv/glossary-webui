import {WordStage} from "../../_models/word-stage";

export class GenericTest {
  constructor(public words: GenericTestWord[]) {
  }
}

export class GenericTestWord {
  constructor(public wordId: number,
              public text: string,
              public translation: string,
              public stage: WordStage,
              public image: string,
              public sound: string) {
  }
}
