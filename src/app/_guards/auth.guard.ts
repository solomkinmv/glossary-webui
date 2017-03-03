import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from "@angular/router";
import {Observable} from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {
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

  checkLogin(url: string): boolean {
    if (localStorage.getItem('tokenHolder')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url

    // todo: save return url
    this.router.navigate(['/login']);
    return false;
  }
}
