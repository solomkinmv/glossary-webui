import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {JwtUtil} from "../_util/jwt.util";
import {Observable} from "rxjs/Observable";
import {Profile} from "../profile/profile";
import {RestUtils} from "../_util/rest.util";
import {RegisterForm} from "../authentication/register/register-form";
import {ProfileMeta} from "../profile/profile-meta";
import {Statistic} from "../_models/statistic";

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

  public update(profileMeta: ProfileMeta): Observable<string> {
    return RestUtils.processGenericResponse(this.http.post('/api/me', profileMeta, JwtUtil.getRequestOptions()));
  }

  public statistic(): Observable<Statistic> {
    return RestUtils.genericHandler(this.http.get('/api/statistic', JwtUtil.getRequestOptions()))
      .map((response: Response) => response.json().statistic as Statistic);
  }
}
