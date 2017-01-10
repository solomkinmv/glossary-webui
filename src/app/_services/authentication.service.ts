import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
