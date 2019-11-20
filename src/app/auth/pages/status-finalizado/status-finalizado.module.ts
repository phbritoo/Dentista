import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatusFinalizadoPage } from './status-finalizado.page';

const routes: Routes = [
  {
    path: '',
    component: StatusFinalizadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatusFinalizadoPage]
})
export class StatusFinalizadoPageModule {}
