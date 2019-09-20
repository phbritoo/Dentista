import { ModalPedidoPage } from './../modal-pedido/modal-pedido.page';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home-dentista',
  templateUrl: './home-dentista.page.html',
  styleUrls: ['./home-dentista.page.scss']
})
export class HomeDentistaPage implements OnInit {
  private loading: any;
  public pedidos = new Array<Pedido>();
  private pedidosSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private pedidoService: PedidoService,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController
  ) {
    this.pedidosSubscription = this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPedidoPage
    });
    return await modal.present();
  }
  // async openModal() {
  //   const modal: HTMLIonModalElement = await this.modalController.create({
  //     component: ModalPedidoPage,
  //     componentProps: {
  //       aParameter: true,
  //       otherParameter: new Date()
  //     }
  //   });

  //   modal.onDidDismiss().then((detail: OverlayEventDetail) => {
  //     if (detail !== null) {
  //       console.log('The result:', detail.data);
  //     }
  //   });

  //   await modal.present();
  // }

  ngOnInit() {}

  /*  quem tiver com o VS CODE atualizado, provavelmente estará vendo este warning no ngOnDestroy()
      "Lifecycle interface OnDestroy should be implemented for method ngOnDestroy."
      Depois da 1° release nós pararemos pra entender melhor
      https://code-examples.net/pt/docs/angular/guide/lifecycle-hooks*/
  ngOnDestroy() {
    this.pedidosSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
    /* devido ao CanActivate, provavelmente não será necessário
   esse router. Ele será automático. Comentar e testar depois */
    this.router.navigate(['/login']);
  }

  async deletePedido(id: string) {
    try {
      await this.pedidoService.deletePedido(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!',
      message: 'Tem certeza que deseja excluir este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Excluir Pedido',
          handler: () => {
            console.log('Confirm Cancel: blah');
            /*Método de excluir depende da inserção do id do usuário no atributo "id" do pedido.
            O método em pedido.service está excluindo a partir de um id inserido na hora da
            criação. Só que na hora da criação não ta criando pedido com o Uid do usuário.
            OBS.: fiz um teste setando o id na mão no FIREBASE e deu certo.*/
            // this.deletePedido();
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
}
