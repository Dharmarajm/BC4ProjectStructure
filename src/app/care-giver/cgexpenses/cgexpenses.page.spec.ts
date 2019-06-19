import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgexpensesPage } from './cgexpenses.page';

describe('CgexpensesPage', () => {
  let component: CgexpensesPage;
  let fixture: ComponentFixture<CgexpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgexpensesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgexpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
