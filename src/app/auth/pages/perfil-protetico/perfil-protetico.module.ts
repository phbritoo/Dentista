import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilProteticoPage } from './perfil-protetico.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilProteticoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [PerfilProteticoPage]
})
export class PerfilProteticoPageModule {}
