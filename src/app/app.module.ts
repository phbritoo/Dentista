import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrMaskerModule } from 'br-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DentistaGuard } from './guards/dentista.guard';
import { ProteticoGuard } from './guards/protetico.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFontAwesomeModule,
    CoreModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrMaskerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  entryComponents: [],
  providers: [
    StatusBar,
    SplashScreen,
    DentistaGuard,
    ProteticoGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
