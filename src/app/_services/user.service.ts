import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {TokenHolder} from "../_models/TokenHolder";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  me() {
    return this.http.get('/api/me', JwtUtil.getRequestOptions())
      .toPromise()
      .then((response: Response) => response.json());
  }

  create(user: TokenHolder) {
    // todo: fix this method
    return this.http.post('/api/auth/register', JwtUtil.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
