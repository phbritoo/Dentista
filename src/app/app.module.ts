import { LoginComponent } from './pages/auth/login/login.component';
import { HomeLaboratorioComponent } from './pages/home/home-laboratorio/home-laboratorio.component';
import { HomeDentistaComponent } from './pages/home/home-dentista/home-dentista.component';
import { IndexComponent } from './pages/index/index.component';
import { CadastroLaboratorioComponent } from './pages/cadastro/cadastro-laboratorio/cadastro-laboratorio.component';
import { CadastroDentistaComponent } from './pages/cadastro/cadastro-dentista/cadastro-dentista.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    CadastroDentistaComponent,
    CadastroLaboratorioComponent,
    IndexComponent,
    HomeDentistaComponent,
    HomeLaboratorioComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
