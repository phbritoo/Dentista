import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPendentePage } from './status-pendente.page';

describe('StatusPendentePage', () => {
  let component: StatusPendentePage;
  let fixture: ComponentFixture<StatusPendentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusPendentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPendentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
