import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Quiz} from "../_models/quiz";
import {WritingTest} from "../_models/writing-test";
import {PracticeResults} from "../_models/practice-results";
import {HttpClient} from "@angular/common/http";
import {RestUtils} from "../../../_util/rest.util";
import {GenericTest} from "../_models/generic-test";

@Injectable()
export class PracticeService {
  constructor(private http: HttpClient) {
  }

  public getQuiz(setId: number = NaN, originQuestions: boolean = false): Observable<Quiz> {
    console.log(`PracticeService.getQuiz(setId = ${setId}, originQuestions = ${originQuestions})`);

    const params = {
      originQuestions: originQuestions.toString()
    };
    if (setId) {
      params["setId"] = setId.toString();
    }

    console.log(`Get quiz with parameters: ${JSON.stringify(params)}`);

    return this.http.get<Quiz>('/api/words-service/practices/quiz', {
      params: params
    });
  }

  public getWritingTest(setId: number = NaN, originQuestions: boolean = true): Observable<WritingTest> {
    console.log(`PracticeService.getWritingTest(setId = ${setId}, originQuestions = ${originQuestions})`);

    const params = {
      originQuestions: originQuestions.toString()
    };
    if (setId) {
      params["setId"] = setId.toString();
    }

    return this.http.get<WritingTest>(`/api/words-service/practices/writing`, {
      params: params
    });
  }

  public genericTest(setId: number = NaN,
                     originQuestions: boolean = true,
                     practiceType: PracticeType = null): Observable<GenericTest> {

    console.log(`PracticeService.getWordsForRepetition(setId = ${setId}, originQuestion = ${originQuestions}, practiceType = ${practiceType})`);

    const params = {
      originQuestions: originQuestions.toString()
    };
    if (setId) {
      params["setId"] = setId.toString();
    }
    if (practiceType) {
      params["practiceType"] = practiceType;
    }

    return this.http.get<GenericTest>(`/api/words-service/practices/generic`, {
      params: params
    });
  }

  public handleResults(answers: Map<number, boolean>): Observable<void> {
    let practiceResults = new PracticeResults(RestUtils.mapToObj(answers));
    console.log(`PracticeService.handleResults(answers=${JSON.stringify(practiceResults)})`);

    return this.http.post<void>('/api/words-service/practices', practiceResults);
  }
}

export enum PracticeType {
  LEARNING = "LEARNING",
  LEARNED_FIRST = "LEARNED_FIRST",
  ALL = "ALL"
}