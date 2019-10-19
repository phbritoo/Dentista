import { Component, ViewChildren, QueryList, OnDestroy } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Pages } from './auth/pages/interfaces/pages';
import { AuthService } from 'src/app/core/services/auth.service';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  user: firebase.User;
  email;
  nome;
  uid;

  mainuser: AngularFirestoreDocument;
  sub;
  cpf: string;
  cro: string;
  data: string;
  isDentista: string;
  telefone: string;

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    public router: Router,
    public alertController: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.appPages = [
      {
        title: 'Meus Pedidos',
        url: '/home-dentista',
        // direct: 'root',
        icon: 'md-list-box'
      },
      // {
      //   title: 'Novo Pedido',
      //   url: '/novo-pedido',
      //   // direct: 'forward',
      //   icon: 'md-add-circle-outline'
      // },

      {
        title: 'Pedidos Concluídos',
        url: '/home-dentista',
        // direct: 'forward',
        icon: 'md-checkbox-outline'
      },
      {
        title: 'Pedidos Pendentes',
        url: '/home-dentista',
        // direct: 'forward',
        icon: 'clock'
      }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonEvent();
      this.splashScreen.hide();
      this.authService.authState$.subscribe(user => {
        this.user = user;
        this.email = user.email;
        this.nome = user.displayName;
        this.uid = user.uid;

        // console.log(this.email);
        // console.log(this.nome);
        // console.log(this.uid);

        this.mainuser = this.afs.doc('User/' + this.uid);

        // Carregando os dados do usuário logado
        this.sub = this.mainuser.valueChanges().subscribe(event => {
          this.cpf = event.cpf;
          this.cro = event.cro;
          this.data = event.data;
          this.isDentista = event.isDentista;
          this.telefone = event.telefone;
          console.log(this.cpf);
          console.log(this.cro);
          console.log(this.data);
          console.log(this.isDentista);
          console.log(this.telefone);
        });
      });
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
    this.authService.logout();
  }
}
