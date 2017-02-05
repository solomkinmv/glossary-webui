import {Injectable} from "@angular/core";
import {RequestOptions, Http, Response, Headers} from "@angular/http";
import {TokenHolder} from "../_models/TokenHolder";

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  me() {
    return this.http.get('/api/me', this.jwt()).map((response: Response) => response.json());
  }

  create(user: TokenHolder) {
    return this.http.post('/api/auth/register', this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let tokenHolder = JSON.parse(localStorage.getItem('tokenHolder'));
    if (tokenHolder && tokenHolder.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + tokenHolder.token})
      return new RequestOptions({headers: headers});
    }
  }
}
