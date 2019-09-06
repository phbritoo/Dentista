import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

// Pacote do AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    NgxMaskModule.forRoot(),
    // Metodo do AngulaFire que fornece a inicializacao do projeto no firebase
    // Esses servicos ficaram disponiveis por toda aplicacao
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  exports: [BrowserModule, IonicModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class CoreModule {}
