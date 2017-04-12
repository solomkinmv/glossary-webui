import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {JwtUtil} from "../../_util/jwt.util";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageService {
  constructor(private http: Http) {
  }

  public getImages(word: string): Observable<string[]> {
    console.log(`ImageService.getImages(${word})`);
    let searchParams = new URLSearchParams();
    searchParams.set("query", word);
    let options = JwtUtil.getRequestOptions();
    options.search = searchParams;

    return this.http.get(`/api/images`, options)
      .map(response => response.json().images as string[]);
  }
}
