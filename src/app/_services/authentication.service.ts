import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string) {
    const body = JSON.stringify({username: username, password: password});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({'headers': headers});

    return this.http.post('/api/auth/login', body, options)
      .map((response: Response) => {
        const tokenHolder = response.json();
        if (tokenHolder && tokenHolder.token) {
          localStorage.setItem('tokenHolder', JSON.stringify(tokenHolder));
        }
      })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('tokenHolder');
  }
}
