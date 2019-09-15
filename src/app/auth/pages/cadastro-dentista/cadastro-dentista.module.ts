import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroDentistaPage } from './cadastro-dentista.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDentistaPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [CadastroDentistaPage]
})
export class CadastroDentistaPageModule {}
