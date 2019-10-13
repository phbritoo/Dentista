import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilDentistaPage } from './perfil-dentista.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilDentistaPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [PerfilDentistaPage]
})
export class PerfilDentistaPageModule {}
