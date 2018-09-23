import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TranslateResult} from "../_models/translate-result";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {RestUtils} from "../../_util/rest.util";

@Injectable()
export class TranslateService {
  constructor(private http: HttpClient) {
  }

  private readonly TARGET = "RUSSIAN";

  public translate(text: string): Observable<TranslateResult> {

    console.log(`TranslateService.translate(text = ${text})`);

    const params = {
      text: text,
      target: this.TARGET
    };

    return this.http.post<TranslateResult>(`/api/translate-service/translate`, null, {
      params: params
    }).pipe(
      catchError(RestUtils.handleError('translate text', new TranslateResult(text, [], "", this.TARGET)))
    )
  }
}