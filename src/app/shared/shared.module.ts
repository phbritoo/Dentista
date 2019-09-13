import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [IonicModule],
  exports: [CommonModule, ReactiveFormsModule, IonicModule, FooterComponent]
})
export class SharedModule {}
