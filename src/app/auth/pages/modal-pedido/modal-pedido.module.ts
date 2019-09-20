import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalPedidoPage } from './modal-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPedidoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ModalPedidoPageModule {}
