import {Injectable} from "@angular/core";

import {Word} from "../_models/word";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class WordSetsService {
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Word[]> {
    return this.http.get<Word[]>('/api/words-service/word-sets/?userId=17')
        .pipe(
            tap(wordSets => console.info('fetched heroes' + wordSets.toString())),
            catchError(this.handleError('get word sets', []))
        );
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error("error handleer: " + error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
