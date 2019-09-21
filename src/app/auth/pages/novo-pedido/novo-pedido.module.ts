import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoPedidoPage } from './novo-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: NovoPedidoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [NovoPedidoPage]
})
export class NovoPedidoPageModule {}
