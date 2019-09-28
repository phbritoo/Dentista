import { Component, ViewChildren, QueryList, OnDestroy } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Pages } from './auth/pages/interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    public router: Router,
    public alertController: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-dentista',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/novo-pedido',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'App Settings',
        url: '/home-protetico',
        direct: 'forward',
        icon: 'cog'
      }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonEvent();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/tela-inicial') {
          this.presentAlertConfirm();
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!',
      message: 'Tem certeza que deseja sair do Protolab?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirma Cancelamento');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            console.log('Confirma Saída');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  // vamos mudar

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }
}
