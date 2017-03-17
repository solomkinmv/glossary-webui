import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../_services/user.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  private me: Object;

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActivate");
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return this.isLoggedIn()
      .catch(e => {
        console.log("CheckLogin failed");
        // not logged in so redirect to login page with the return url
        // todo: save return url
        this.router.navigate(['/login']);
        return false;
      });
  }

  isLoggedIn(): Promise<boolean> {
    return this.userService.me()
      .then(data => {
        console.log("CheckLogin me:");
        console.log(data);
        if (data['username']) {
          return true;
        }
      });
  }
}
