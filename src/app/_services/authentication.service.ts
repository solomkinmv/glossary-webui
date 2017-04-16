import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {
  public loggedIn = new Subject();

  constructor(private http: Http,
              private router: Router) {
    this.loggedIn.next(false);
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
          this.loggedIn.next(true);
        }

        return response;
      })
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('tokenHolder');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
