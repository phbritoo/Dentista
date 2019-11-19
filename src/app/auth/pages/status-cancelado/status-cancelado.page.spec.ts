import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCanceladoPage } from './status-cancelado.page';

describe('StatusCanceladoPage', () => {
  let component: StatusCanceladoPage;
  let fixture: ComponentFixture<StatusCanceladoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCanceladoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCanceladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
