import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTestePage } from './cadastro-teste.page';

describe('CadastroTestePage', () => {
  let component: CadastroTestePage;
  let fixture: ComponentFixture<CadastroTestePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTestePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTestePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
