import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {WordSet} from "../dictionary/word-set";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class WordSetService {
  constructor(private http: Http) {
  }

  getAll(): Promise<Array<WordSet>> {
    console.log("WordSetService.getAll()");
    return this.http.get("/api/wordSets", JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        return response.json().content.map(el => el.wordSet);
      });
  }

  get(id: number | string) {
    console.log(`WordSetService.get(${id})`);
    return this.http.get(`/api/wordSets/${id}`, JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        console.log(response.json());
        return response.json().wordSet;
      })
  }
}