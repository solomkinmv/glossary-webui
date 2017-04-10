import {PracticeAnswer} from "./practice-answer";

export class Quiz {
  constructor(public questions: Array<QuizQuestion>) {
  }
}

export class QuizQuestion {
  constructor(public questionText: string,
              public answer: PracticeAnswer,
              public alternatives: Array<string>) {
  }
}
