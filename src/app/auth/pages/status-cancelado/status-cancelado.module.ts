import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatusCanceladoPage } from './status-cancelado.page';

const routes: Routes = [
  {
    path: '',
    component: StatusCanceladoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatusCanceladoPage]
})
export class StatusCanceladoPageModule {}
