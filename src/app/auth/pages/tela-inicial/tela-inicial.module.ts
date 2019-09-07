import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaInicialPage } from './tela-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TelaInicialPage
  }
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [TelaInicialPage]
})
export class TelaInicialPageModule {}
