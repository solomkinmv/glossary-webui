import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {WordSet} from "../_models/word-set";
import {JwtUtil} from "../../_util/jwt.util";
import {Word} from "../_models/word";
import {Observable} from "rxjs/Observable";
import {WordSetMeta} from "../_models/word-set-meta";
import {RestUtils} from "../../_util/rest.util";
import {WordService} from "./word.service";

@Injectable()
export class WordSetService {
  constructor(private http: Http,
              private wordService: WordService) {
  }

  public getAll(): Observable<WordSet[]> {
    console.log("WordSetService.getAll()");
    return this.http.get("/api/sets", JwtUtil.getRequestOptions())
      .map((response: Response) => response.json()
        ._embedded
        .wordSetResourceList
        .map(value => value.set) as WordSet[]);
  }

  public get(id: number | string): Observable<WordSet> {
    console.log(`WordSetService.get(${id})`);
    return this.http.get(`/api/sets/${id}`, JwtUtil.getRequestOptions())
      .map((response: Response) => response.json().set as WordSet);
  }

  public create(set: WordSet): Observable<string> {
    console.log('WordSetService.create: ' + set);
    return this.http.post('/api/sets', set, JwtUtil.getRequestOptions())
      .map((response: Response) => response.headers.get('Location'));
  }

  public remove(id: number | string): Observable<string> {
    console.log(`WordSetService.remove(${id})`);
    return RestUtils.processGenericResponse(
      this.http.delete(`/api/sets/${id}`, JwtUtil.getRequestOptions()));
  }

  public removeWordFromWordSet(setId: number | string, wordId: number | string): Observable<string> {
    console.log(`WordSetService.removeWordFromWordSet(${setId}, ${wordId})`);
    return RestUtils.processGenericResponse(
      this.http.delete(`/api/sets/${setId}/words/${wordId}`, JwtUtil.getRequestOptions()));
  }

  public addWord(setId: string | number, word: Word): Observable<Word> {
    console.log(`WordSetService.addWord(${setId}, Word${JSON.stringify(word)})`);
    return this.http.post(`/api/sets/${setId}/words`, word, JwtUtil.getRequestOptions())
      .map((response: Response) => response.headers.get('Location'))
      .do((location: string) => console.log("Added record: " + location))
      .map((location: string) => RestUtils.getIdFromLocation(location))
      .flatMap((id: number) => this.wordService.get(id))
      .catch(RestUtils.serverError)
  }

  public update(id: number | string, meta: WordSetMeta): Observable<string> {
    console.log(`WordSetService.update(${id}, ${meta})`);
    return RestUtils.processGenericResponse(
      this.http.patch(`/api/sets/${id}`, meta, JwtUtil.getRequestOptions()));
  }
}
