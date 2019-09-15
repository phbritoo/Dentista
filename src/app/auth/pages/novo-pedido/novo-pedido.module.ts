import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

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
