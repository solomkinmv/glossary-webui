import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {Profile} from "./profile";
import {ProfileMeta} from "./profile-meta";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  private profile: Profile;
  private model: ProfileMeta = new ProfileMeta();

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log('ProfileComponent init');
    this.updateProfile();
  }

  private updateProfile() {
    this.userService.me()
      .subscribe((profile: Profile) => {
        this.profile = profile;
        this.cancel();
      });
  }

  private fillModel(): void {
    this.model.name = this.profile.name;
    this.model.email = this.profile.email;
  }

  private save(): void {
    this.userService.update(this.model)
      .subscribe(data => this.alertService.success("Successfully saved changes"),
        err => this.alertService.error(err));

    this.updateProfile();
  }

  private cancel(): void {
    this.fillModel();
    this.model.password = '';
    this.model.confirmPassword = '';
  }
}
