import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {UserService} from "../_services/user.service";
import {Component} from "@angular/core";
import {RegisterForm} from "./register-form";

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private model: RegisterForm = new RegisterForm();
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    console.log(this.model);
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          // set success message and pass true parameter to persist the message after redirecting to the login page
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }
}
