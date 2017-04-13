import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {JwtUtil} from "../_util/jwt.util";
import {RegisterForm} from "../register/register-form";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  me() {
    return this.http.get('/api/me', JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => response.json());
  }

  create(user: RegisterForm): Observable<any> {
    // todo: fix this method
    return this.http.post('/api/auth/register', user, JwtUtil.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
