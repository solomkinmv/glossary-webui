import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSetsComponent } from './word-sets.component';

describe('WordSetsComponent', () => {
  let component: WordSetsComponent;
  let fixture: ComponentFixture<WordSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
