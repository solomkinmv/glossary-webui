import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  public searchImages(word: string): Observable<string[]> {
    console.log(`ImageService.searchImages(${word})`);
    return this.http.get<string[]>('/api/image-service/search', {
      params: {
        tags: word
      }
    }).pipe(
      tap(res => console.log(res))
    )
  }

  public uploadImage(file: File): Observable<string> {
    console.log(`ImageService.uploadImage(file = ${file.name})`);
    let formData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post<HttpResponse<void>>('/api/image-service/', formData, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<void>) => response.headers.get('Location'))
      );
  }
}
