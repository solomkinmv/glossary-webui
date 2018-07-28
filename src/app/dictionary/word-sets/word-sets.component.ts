import { Component, OnInit } from '@angular/core';
import {Word} from "../_models/word";
import {WordSetsService} from "../_services/word-sets.service";
import {Observable} from "rxjs";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-word-sets',
  templateUrl: './word-sets.component.html',
  styleUrls: ['./word-sets.component.css']
})
export class WordSetsComponent implements OnInit {

  constructor(private wordSetsService: WordSetsService,
              private keycloak: KeycloakService) { }

  ngOnInit() {
    this.wordSetsService.getAll()
      .subscribe(
        (x => console.log('OK' + JSON.stringify(x))),
        (x => console.log('ERROR' + JSON.stringify(x))),
        (() => console.log('COMPLETE'))
      );

    console.log(this.keycloak.getKeycloakInstance().subject);
    this.keycloak.loadUserProfile()
      .then(profile => console.log(profile.id))
  }

}
