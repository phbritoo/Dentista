import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroProteticoPage } from './cadastro-protetico.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroProteticoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [CadastroProteticoPage]
})
export class CadastroProteticoPageModule {}
