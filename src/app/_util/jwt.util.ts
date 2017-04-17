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

  public static parseToken(): any {
    let token = JSON.parse(localStorage.getItem('tokenHolder')).token;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
