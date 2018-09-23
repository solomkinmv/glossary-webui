import {Observable, of} from "rxjs";

export class RestUtils {

  public static mapToObj(map: Map<number, boolean>): object {
    let obj = Object.create(null);
    map.forEach((value: boolean, key: number) => {
      obj[key] = value;
    });
    return obj;
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`error handler ${operation}: ${error}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}