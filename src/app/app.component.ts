import { Component, ViewChildren, QueryList, OnDestroy } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Pages } from './auth/pages/interfaces/pages';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  user: firebase.User;

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    public router: Router,
    public alertController: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private authService: AuthService
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-dentista',
        icon: 'md-list-box'
      },
      {
        title: 'Pedidos Aprovados',
        url: '/status-aprovado',
        icon: 'thumbs-up'
      },
      {
        title: 'Pedidos Pendentes',
        url: '/status-pendente',
        icon: 'warning'
      },
      {
        title: 'Pedidos Cancelados',
        url: '/status-cancelado',
        icon: 'close-circle'
      },
      {
        title: 'Pedidos em Fabricação',
        url: '/status-fabricacao',
        icon: 'construct'
      },
      {
        title: 'Pedidos Finalizados',
        url: '/status-finalizado',
        icon: 'md-checkbox-outline'
      },
      {
        title: 'Solicitar Protése',
        url: '/novo-pedido',
        icon: 'add'
      }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonEvent();
      this.splashScreen.hide();
      this.authService.authState$.subscribe(user => (this.user = user));
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
    this.navCtrl.navigateForward('perfil-dentista');
  }

  logout() {
    this.authService.logout();
  }
}
