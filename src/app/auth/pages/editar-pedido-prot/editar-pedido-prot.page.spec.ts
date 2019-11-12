import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPedidoProtPage } from './editar-pedido-prot.page';

describe('EditarPedidoProtPage', () => {
  let component: EditarPedidoProtPage;
  let fixture: ComponentFixture<EditarPedidoProtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPedidoProtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPedidoProtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
