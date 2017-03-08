import {Injectable} from "@angular/core";
import {Dictionary} from "../dictionary/dictionary";
import {Http, Response} from "@angular/http";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class DictionaryService {
  constructor(private http: Http) {
  }

  get(): Promise<Dictionary> {
    console.log("DictionaryService.get()");
    return this.http.get(`/api/dictionary`, JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        console.log(response.json());
        return response.json().userDictionary;
      })
  }
}
