import {Injectable} from "@angular/core";
import {Word} from "../_models/word";

import {SearchRecord} from "../_models/search-record";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WordMeta} from "../_models/word-meta";
import {TranslateService} from "./translate.service";
import {map} from "rxjs/operators";
import {TranslateResult} from "../_models/translate-result";

@Injectable()
export class WordService {
  constructor(private http: HttpClient,
              private translateService: TranslateService) {
  }

  public get(id: number): Observable<Word> {
    return this.http.get<Word>(`/api/words-service/words/${id}`);
  }

  public update(id: number, meta: WordMeta): Observable<Word> {
    return this.http.post<Word>(`/api/words-service/words/${id}`, meta);
  }

  public search(term: string): Observable<SearchRecord[]> {
    console.log(`WordService.search(term = ${term})`);

    return this.translateService.translate(term)
      .pipe(
        map((translateResult: TranslateResult) => [new SearchRecord(term, translateResult.result, [], '')]),
      );
  }
}
