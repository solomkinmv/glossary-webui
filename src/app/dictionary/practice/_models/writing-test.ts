import {PracticeAnswer} from "./practice-answer";

export class WritingTest {
  constructor(public questions: Array<WritingTestQuestion>) {
  }
}

export class WritingTestQuestion {
  constructor(public questionText: string,
              public answer: PracticeAnswer) {
  }
}
