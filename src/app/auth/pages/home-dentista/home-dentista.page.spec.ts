import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDentistaPage } from './home-dentista.page';

describe('HomeDentistaPage', () => {
  let component: HomeDentistaPage;
  let fixture: ComponentFixture<HomeDentistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDentistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDentistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
