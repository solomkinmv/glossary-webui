import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class WordService {
  constructor(private http: Http) {
  }

  get(id: number | string) {
    return this.http.get(`/api/words/${id}`, JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        return response.json().wordSet;
      })
  }
}
