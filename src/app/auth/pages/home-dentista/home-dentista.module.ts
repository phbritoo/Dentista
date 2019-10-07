import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDentistaPage } from './home-dentista.page';
// chamando os componentes
import { SharedModule } from '../../../shared/shared.module';
import { PopupMenuPage } from '../popup-menu/popup-menu.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDentistaPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [HomeDentistaPage, PopupMenuPage]
})
export class HomeDentistaPageModule {}
