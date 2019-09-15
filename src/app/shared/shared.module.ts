import { BrMaskerModule } from 'br-mask';
import { FooterComponent } from './../auth/components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FooterComponent],
  imports: [IonicModule, ReactiveFormsModule, BrMaskerModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    FooterComponent
  ]
})
export class SharedModule {}
