import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {JwtUtil} from "../../_util/jwt.util";
import {Word} from "../_models/word";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {WordMeta} from "../_models/word-meta";
import {SearchRecord} from "../_models/search-record";

@Injectable()
export class WordService {
  constructor(private http: Http) {
  }

  public getAll(): Observable<Word> {
    return this.http.get(`/api/words`, JwtUtil.getRequestOptions())
      .switchMap((response: Response) => response.json()._embedded.wordResourceList.map(value => value.word) as Word[])
  }

  public get(id: number | string): Observable<Word> {
    return this.http.get(`/api/words/${id}`, JwtUtil.getRequestOptions())
      .map((response: Response) => response.json().word);
  }

  public update(id: number | string, meta: WordMeta) {
    return this.http.post(`/api/words/${id}`, meta, JwtUtil.getRequestOptions())
      .map((response: Response) => +response.headers.get('Location').split('/').pop());
  }

  public search(term: string): Observable<SearchRecord[]> {
    let searchParams = new URLSearchParams();
    searchParams.set("text", term);
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return this.http.get(`api/words/search`, options)
      .map(response => response.json().result.records as SearchRecord[]);
  }
}
