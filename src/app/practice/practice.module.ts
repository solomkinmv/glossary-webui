import {NgModule} from "@angular/core";
import {PracticeRoutingModule} from "./practice-routing.module";
import {FormsModule} from "@angular/forms";
import {PracticeComponent} from "./practice.component";
import {CommonModule} from "@angular/common";
import {WritePracticeComponent} from "./write-practice.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PracticeRoutingModule
  ], declarations: [
    PracticeComponent,
    WritePracticeComponent
  ], providers: [
    // services
  ]
})
export class PracticeModule {
}
