import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CghealthDiaryPage } from './cghealth-diary.page';

describe('CghealthDiaryPage', () => {
  let component: CghealthDiaryPage;
  let fixture: ComponentFixture<CghealthDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CghealthDiaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CghealthDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
