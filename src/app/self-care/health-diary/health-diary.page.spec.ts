import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDiaryPage } from './health-diary.page';

describe('HealthDiaryPage', () => {
  let component: HealthDiaryPage;
  let fixture: ComponentFixture<HealthDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthDiaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
