import {WordStage} from "./word-stage";
export class PracticeAnswer {
  constructor(public wordId: number,
              public answerText: string,
              public stage: WordStage,
              public image: string,
              public pronunciation: string) {
  }
}
