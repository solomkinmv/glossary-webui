import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {Profile} from "../_models/profile";

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  private profile: Profile;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log('ProfileComponent init');
    this.userService.me()
      .subscribe((profile: Profile) => this.profile = profile);
  }
}
