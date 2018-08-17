import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {WordSet} from "../_models/word-set";
import {WordSetMeta} from "../_models/word-set-meta";
import {WordMeta} from "../_models/word-meta";

@Injectable()
export class WordSetsService {
  constructor(private http: HttpClient) {
  }

  public get(id: number): Observable<WordSet> {
    return this.http.get<WordSet>(`api/words-service/word-sets/${id}`)
  }

  public getAll(): Observable<WordSetMeta[]> {
    return this.http.get<WordSet[]>('/api/words-service/word-sets/')
      .pipe(
        map(wordSetArray => wordSetArray.map(ws => new WordSetMeta(ws.id, ws.name, ws.description, ws.words.length))),
        tap(wordSets => console.info('fetched word sets ' + JSON.stringify(wordSets))),
        catchError(this.handleError('get word sets', []))
      );
  }

  public getAllWithDetails(): Observable<WordSetMeta[]> {
    return this.http.get<WordSet[]>('/api/words-service/word-sets/')
      .pipe(
        map(wordSetArray => wordSetArray.map(ws => new WordSetMeta(ws.id, ws.name, ws.description, ws.words.length))),
        tap(wordSets => console.info('fetched word sets ' + JSON.stringify(wordSets))),
        catchError(this.handleError('get word sets', []))
      );
  }

  public create(set: WordSetMeta): Observable<WordSetMeta> {
    console.log('WordSetService.create: ' + JSON.stringify(set));
    return this.http.post<number>('/api/words-service/word-sets/', set)
      .pipe(
        map(id => new WordSetMeta(id, set.name, set.description, 0))
      );
  }

  public update(set: WordSetMeta): Observable<WordSetMeta> {
    console.log('WordSetService.update: ' + JSON.stringify(set));

    return this.http.patch<WordSet>(`/api/words-service/word-sets/${set.id}`, set)
      .pipe(
        map(wordSet => new WordSetMeta(wordSet.id, wordSet.name, wordSet.description, wordSet.words.length))
      );
  }

  public remove(id: number): Observable<number> {
    console.log(`WordSetService.remove(${id})`);

    return this.http.delete(`/api/words-service/word-sets/${id}`)
      .pipe(
        map(res => id)
      )
  }

  public removeWordFromWordSet(setId: number, wordId: number): Observable<null> {
    console.log(`WordSetService.removeWordFromWordSet(setId = ${setId}, wordId = ${wordId})`);

    return this.http.delete<null>(`/api/words-service/word-sets/${setId}/words/${wordId}`)
  }

  public addWordToWordSet(setId: number, word: WordMeta): Observable<WordSet> {
    console.log(`WordSetService.addWordToWordSet(setId = ${setId}, word = ${JSON.stringify(word)})`);

    return this.http.post<WordSet>(`/api/words-service/word-sets/${setId}/words`, word);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`error handler ${operation}: ${error}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
