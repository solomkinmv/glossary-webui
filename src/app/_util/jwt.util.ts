import {Headers, RequestOptions} from "@angular/http";

export class JwtUtil {

  public static getRequestOptions(): RequestOptions {
    // create authorization header with jwt token
    let tokenHolder = JSON.parse(localStorage.getItem('tokenHolder'));
    if (tokenHolder && tokenHolder.token) {
      let headers = new Headers({'X-Authorization': 'Bearer ' + tokenHolder.token});
      return new RequestOptions({headers: headers});
    }
  }
}
