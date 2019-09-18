import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDentistaPage } from './home-dentista.page';
// chamando os componentes
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: HomeDentistaPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [HomeDentistaPage]
})
export class HomeDentistaPageModule {}
