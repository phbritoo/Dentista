import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';

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
    private router: Router
  ) {
    this.pedidosSubscription = this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  ngOnInit() {}

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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
