import {WordStage} from "./word-stage";

export class Word {
  constructor(public id: number,
              public text: string,
              public translation: string,
              public stage: WordStage,
              public image: string,
              public sound: string) {
  }
}
