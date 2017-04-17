import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {JwtUtil} from "../_util/jwt.util";
import {RegisterForm} from "../authentication/register/register-form";
import {Observable} from "rxjs/Observable";
import {Profile} from "../_models/profile";
import {RestUtils} from "../_util/rest.util";

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  public me(): Observable<Profile> {
    return RestUtils.genericHandler(this.http.get('/api/me', JwtUtil.getRequestOptions()))
      .map((response: Response) => response.json().profile as Profile);
  }

  public create(user: RegisterForm): Observable<any> {
    return this.http.post('/api/auth/register', user, JwtUtil.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
