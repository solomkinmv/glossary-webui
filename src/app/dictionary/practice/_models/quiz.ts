import {PracticeAnswer} from "./practice-answer";

export class Quiz {
  constructor(public questions: QuizQuestion[]) {
  }
}

export class QuizQuestion {
  constructor(public questionText: string,
              public answer: PracticeAnswer,
              public alternatives: string[]) {
  }
}
