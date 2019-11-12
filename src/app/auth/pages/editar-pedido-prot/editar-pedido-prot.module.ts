import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarPedidoProtPage } from './editar-pedido-prot.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: EditarPedidoProtPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), NgbModule],
  declarations: [EditarPedidoProtPage]
})
export class EditarPedidoProtPageModule {}
