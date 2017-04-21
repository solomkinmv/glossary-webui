import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Quiz} from "../_models/quiz";
import {JwtUtil} from "../../_util/jwt.util";
import {WritingTest} from "../_models/writing-test";
import {RestUtils} from "../../_util/rest.util";
import {PracticeResults} from "../_models/practice-results";
import {Word} from "../_models/word";

@Injectable()
export class PracticeService {
  constructor(private http: Http) {
  }

  public getQuiz(setId: number | string, originQuestions: boolean = false): Observable<Quiz> {
    console.log(`PracticeService.getQuiz(${setId}, ${originQuestions})`);

    let searchParams = new URLSearchParams();
    searchParams.set("originQuestions", originQuestions.toString());
    if (setId) {
      searchParams.set("setId", setId.toString());
    }
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return this.http.get('/api/practices/quizzes', options)
      .map((response: Response) => response.json().quiz as Quiz)
      .do((quiz: Quiz) => console.log(quiz))
      .catch(RestUtils.serverError);
  }

  public getWritingTest(setId: number | string, originQuestions: boolean = true): Observable<WritingTest> {
    console.log(`PracticeService.getWritingTest(${setId}, ${originQuestions})`);

    let searchParams = new URLSearchParams();
    searchParams.set("originQuestions", originQuestions.toString());
    if (setId) {
      searchParams.set("setId", setId.toString());
    }
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return this.http.get(`/api/practices/writings`, options)
      .map((response: Response) => response.json().writingPracticeTest as WritingTest)
      .do((writingTest: WritingTest) => console.log(writingTest))
      .catch(RestUtils.serverError);
  }

  public getWordsForRepetition(setId: number | string): Observable<Word[]> {
    console.log(`PracticeService.getWordsForRepetition(${setId})`);

    let searchParams = new URLSearchParams();
    if (setId) {
      searchParams.set("setId", setId.toString());
    }
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return RestUtils.genericHandler(this.http.get(`/api/practices/repetitions`, options))
      .map((response: Response) => response.json().words as Word[]);
  }

  public handleResults(answers: Map<number, boolean>): Observable<string> {
    let practiceResults = new PracticeResults(RestUtils.mapToObj(answers));
    console.log(`PracticeService.handleResults(PracticeResults${JSON.stringify(practiceResults)})`);

    return RestUtils.processGenericResponse(
      this.http.post('/api/practices', practiceResults, JwtUtil.getRequestOptions()));
  }
}
