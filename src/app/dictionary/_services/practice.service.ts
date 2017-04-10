import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Quiz} from "../_models/quiz";
import {JwtUtil} from "../../_util/jwt.util";
import {WritingTest} from "../_models/writing-test";

@Injectable()
export class PracticeService {
  constructor(private http: Http) {
  }

  public getQuiz(setId: number | string): Observable<Quiz> {
    console.log(`PracticeService.getQuiz(${setId})`);
    let searchParams = new URLSearchParams();
    searchParams.set("setId", setId.toString());
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return this.http.get('/api/practices/quizzes', options)
      .map((response: Response) => response.json().quiz as Quiz);
  }

  public getWritingTest(setId: number | string): Observable<WritingTest> {
    console.log(`PracticeService.getWritingTest(${setId})`);
    let searchParams = new URLSearchParams();
    searchParams.set("setId", setId.toString());
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return this.http.get(`/api/practices/writings`, options)
      .map((response: Response) => response.json().writingPracticeTest as WritingTest);
  }

  public handleResults(answers: Map<number, boolean>): void {
    this.http.post(`/api/practices`, JwtUtil.getRequestOptions())
  }
}
