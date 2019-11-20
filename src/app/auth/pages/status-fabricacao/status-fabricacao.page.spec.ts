import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFabricacaoPage } from './status-fabricacao.page';

describe('StatusFabricacaoPage', () => {
  let component: StatusFabricacaoPage;
  let fixture: ComponentFixture<StatusFabricacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusFabricacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFabricacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
