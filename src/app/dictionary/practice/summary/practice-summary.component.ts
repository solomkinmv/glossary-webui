import {Component, Input, OnInit} from "@angular/core";
import {Summary} from "../_models/summary";

@Component({
  selector: 'practice-summary',
  templateUrl: 'practice-summary.component.html'
})
export class PracticeSummaryComponent implements OnInit {
  @Input() summary: Summary;
  public score: number;

  ngOnInit(): void {
    this.score = (this.summary.correct.length / (this.summary.correct.length + this.summary.incorrect.length)) * 100;
  }
}
