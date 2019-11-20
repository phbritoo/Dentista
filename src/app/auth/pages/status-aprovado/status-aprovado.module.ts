import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatusAprovadoPage } from './status-aprovado.page';

const routes: Routes = [
  {
    path: '',
    component: StatusAprovadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatusAprovadoPage]
})
export class StatusAprovadoPageModule {}
