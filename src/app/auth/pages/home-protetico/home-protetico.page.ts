import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Platform } from '@ionic/angular';
import {
  ToastController,
  LoadingController,
  ModalController,
  NavController,
  MenuController,
  PopoverController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-protetico',
  templateUrl: './home-protetico.page.html',
  styleUrls: ['./home-protetico.page.scss']
})
export class HomeProteticoPage implements OnInit {
  private loading: any;
  public pedidos = new Array<Pedido>();
  private pedidosSubscription: Subscription;
  public userLogado: any;
  backButtonSubscription;

  constructor(
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private pedidoService: PedidoService,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
    private platform: Platform,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
    this.pedidosSubscription = this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;

      this.platform = platform;

      this.userLogado = this.authService.getAuth().currentUser.displayName;
    });
  }

  editarPedido(id: string) {
    this.router.navigate(['/editar-pedido-prot/' + id.split('/')[0]]);
    console.log(id);
  }
  ngOnInit(): void {
    // menu
    this.menuCtrl.enable(false);
  }

  ngAfterViewInit() {
    this.menuCtrl.enable(false);
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnDestroy() {
    this.menuCtrl.enable(false);
    this.pedidosSubscription.unsubscribe();
    this.backButtonSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
      /* devido ao CanActivate, provavelmente não será necessário
 esse router. Ele será automático. Comentar e testar depois */
      // this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async deletePedido(id: string) {
    try {
      await this.pedidoService.deletePedido(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!',
      message: 'Tem certeza que deseja excluir este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Ação cancelada pelo usuário');
            this.presentToast('<center>' + 'Ação cancelada!' + '</center>');
          }
        },
        {
          text: 'Excluir Pedido',
          handler: () => {
            console.log('Pedido Exluído do Firebase');
            //this.deletePedido(id);
            this.presentToast('Apenas o dentista pode apagar um pedido');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  /*Comentado devido a bugs  */

  // ionViewDidLeave() {
  //   this.router.navigate(['/login']);
  // }
}
