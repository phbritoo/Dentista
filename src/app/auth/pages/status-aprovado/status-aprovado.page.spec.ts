import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAprovadoPage } from './status-aprovado.page';

describe('StatusAprovadoPage', () => {
  let component: StatusAprovadoPage;
  let fixture: ComponentFixture<StatusAprovadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAprovadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAprovadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
