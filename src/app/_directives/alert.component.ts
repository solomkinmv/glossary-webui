import {Component, OnInit} from "@angular/core";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

}
