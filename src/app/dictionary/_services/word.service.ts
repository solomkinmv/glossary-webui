import {Injectable} from "@angular/core";
import {Word} from "../_models/word";

import {SearchRecord} from "../_models/search-record";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {WordMeta} from "../_models/word-meta";

@Injectable()
export class WordService {
  constructor(private http: HttpClient) {
  }

  public get(id: number): Observable<Word> {
    return this.http.get<Word>(`/api/words-service/words/${id}`);
  }

  public update(id: number, meta: WordMeta): Observable<Word> {
    return this.http.post<Word>(`/api/words-service/words/${id}`, meta);
  }

  public search(term: string): Observable<SearchRecord[]> {
    console.log(`WordService.search(term = ${term})`);
    const dummySearchRecord = new SearchRecord(term, ['dummy-translation'], [], '');
    return of([dummySearchRecord]);
  }
}
