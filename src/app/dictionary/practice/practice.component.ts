import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  templateUrl: './practice.component.html'
})
export class PracticeComponent implements OnInit {
  private setId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("PracticeComponent init");
    this.route.params
      .map((params: Params) => +params['id'])
      .subscribe((id: number) => this.setId = id)
  }
}
