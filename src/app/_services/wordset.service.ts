import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {WordSet} from "../_models/WordSet";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class WordSetService {
  constructor(private http: Http) {
  }

  get(): Promise<Array<WordSet>> {
    return this.http.get("/api/wordSets", JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        return response.json().content.map(el => el.wordSet);
      });
  }

}
