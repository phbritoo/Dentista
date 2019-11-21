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
  selector: 'app-home-dentista',
  templateUrl: './home-dentista.page.html',
  styleUrls: ['./home-dentista.page.scss']
})
export class HomeDentistaPage implements OnInit, OnDestroy, AfterViewInit {
  private loading: any;
  public pedidos = new Array<Pedido>();
  private pedidosSubscription: Subscription;
  public userLogado: any;
  backButtonSubscription;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
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
    private platform: Platform
  ) {
    this.pedidosSubscription = this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;

      this.platform = platform;

      this.userLogado = this.authService.getAuth().currentUser.uid;
    });
  }

  //
  editarPedido(id: string) {
    this.router.navigate(['/editar-pedido/' + id.split('/')[0]]);
    console.log(id);
  }
  ngOnInit() {}

// NAO APAGAR - 
  // filtroSelect(value) {
  //   console.log(value);
  //   if (value === '1') {
  //      this.router.navigate(['/home-dentista']);
  //   }
  //   if (value === '2') {
  //     this.router.navigate(['/status-aprovado']);
  //  }
  //   if (value === '3') {
  //    this.router.navigate(['/status-cancelado']);
  //   }
  //   if (value === '4') {
  //     this.router.navigate(['/status-pendente']);
  //   }
  //   if (value === '5') {
  //     this.router.navigate(['/status-finalizado']);
  //   }
  //   if (value === '6') {
  //     this.router.navigate(['/status-fabricacao']);
  //   }
  // }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  /*  quem tiver com o VS CODE atualizado, provavelmente estará vendo este warning no ngOnDestroy()
      "Lifecycle interface OnDestroy should be implemented for method ngOnDestroy."
      Depois da 1° release nós pararemos pra entender melhor
      https://code-examples.net/pt/docs/angular/guide/lifecycle-hooks*/
  ngOnDestroy() {
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
            this.deletePedido(id);
            this.presentToast('O pedido foi excluído com sucesso');
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

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  pendente() {
    // this.router.navigate(['/status-pendente']);
    window.open('/status-pendente');
  }
  aprovado() {
    this.router.navigate(['/status-aprovado']);
  }
  fabricacao() {
    this.router.navigate(['/status-fabricacao']);
  }
  cancelado() {
    this.router.navigate(['/status-cancelado']);
  }

  novo() {
    this.router.navigate(['/novo-pedido']);
  }

}

