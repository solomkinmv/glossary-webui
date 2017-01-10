import {Injectable} from "@angular/core";
import {RequestOptions, Http, Response, Headers} from "@angular/http";
import {User} from "../_models/user";

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  me() {
    return this.http.get('/api/me', this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('/api/auth/register', this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token})
      return new RequestOptions({headers: headers});
    }
  }
}
