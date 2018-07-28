import {WordStage} from "./word-stage";

export class Word {
  public id: number;
  public stage: WordStage;
  public sound: string;

  constructor(public text: string,
              public translation: string,
              public image: string) {
  }
}
