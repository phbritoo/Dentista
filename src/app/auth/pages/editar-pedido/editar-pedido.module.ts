import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarPedidoPage } from './editar-pedido.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: EditarPedidoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), NgbModule],
  declarations: [EditarPedidoPage]
})
export class EditarPedidoPageModule {}
