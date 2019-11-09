import { BrMaskerModule } from 'br-mask';
import { FooterComponent } from './../auth/components/footer/footer.component';
import { HeaderComponent } from './../auth/components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [IonicModule, ReactiveFormsModule, BrMaskerModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
