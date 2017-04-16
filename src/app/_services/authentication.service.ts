import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http,
              private router: Router) {
  }

  private tokenKey = 'tokenHolder';

  public login(username: string, password: string): Observable<Response> {
    const body = JSON.stringify({username: username, password: password});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({'headers': headers});

    return this.http.post('/api/auth/login', body, options)
      .map((response: Response) => {
        const tokenHolder = response.json();
        if (tokenHolder && tokenHolder.token) {
          localStorage.setItem(this.tokenKey, JSON.stringify(tokenHolder));
        }

        return response;
      })
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('tokenHolder');
    this.router.navigate(['/']);
  }

  public containsToken(): boolean {
    console.log('Checking token in local storage');
    let item = localStorage.getItem('tokenHolder');
    return item != null;
  }
}
