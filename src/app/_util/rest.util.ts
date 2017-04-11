import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

export class RestUtils {

  public static getIdFromLocationHeader(response: Response): number {
    return this.getIdFromLocation(response.headers.get('Location'));
  }

  public static getIdFromLocation(location: string): number {
    return +location.split('/').pop();
  }

  public static processGenericResponse(response: Observable<Response>): Observable<string> {
    return response
      .do((response: Response) => console.log(response))
      .map((response: Response) => response.statusText)
      .catch(RestUtils.serverError);
  }

  public static serverError(err: any): Observable<any> {
    console.log('Server error:', err);
    if (err instanceof Response) {
      return Observable.throw(err.json().message || err.json()[0].message || 'Server error');
    }
    return Observable.throw(err || 'Server error');
  }

  public static mapToObj(map: Map<number, boolean>): any {
    let obj = Object.create(null);
    map.forEach((value: boolean, key: number) => {
      obj[key] = value;
    });
    return obj;
  }
}
