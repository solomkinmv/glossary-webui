import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {JwtUtil} from "../_util/jwt.util";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  private me: Object;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthenticationService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("canActivate");
    let url: string = state.url;

    return this.checkLogin(url);
  }

  public canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  public checkLogin(url: string): boolean {
    console.log("AuthGuard checking login");
    if (this.isLoggedIn()) {
      this.authService.loggedIn.next(true);
      return true;
    }

    this.router.navigate(['/login']);
    this.authService.loggedIn.next(false);
    return false;
  }

  public isLoggedIn(): boolean {
    try {
      let jwt = JwtUtil.parseToken();
      let currentTime = new Date().getTime() / 1000;
      return currentTime < jwt.exp;
    } catch (err) {
      console.log("Can't parse JWT: " + err);
      return false;
    }
  }


}
