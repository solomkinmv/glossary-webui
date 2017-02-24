import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {WordSet} from "../_models/WordSet";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class WordSetService {
  constructor(private http: Http) {
  }

  getAll(): Promise<Array<WordSet>> {
    return this.http.get("/api/wordSets", JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        return response.json().content.map(el => el.wordSet);
      });
  }

  get(id: number | string) {
    return this.http.get(`/api/wordSets/${id}`, JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        console.log(response.json());
        return response.json().wordSet;
      })
  }
}
