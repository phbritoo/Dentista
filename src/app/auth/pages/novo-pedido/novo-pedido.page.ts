import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.page.html',
  styleUrls: ['./novo-pedido.page.scss']
})
export class NovoPedidoPage implements OnInit {
  novoPedido: FormGroup;
  public pedido: Pedido = {};
  private pedidoId: string = null;
  private loading: any;
  private pedidoSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {
    this.pedidoId = this.activatedRoute.snapshot.params.id;
    if (this.pedidoId) {
      this.loadPedido();
    }

    // select tipo de proteses
  }

  // validacoes do formulario
  private createForm(): void {
    this.novoPedido = this.fb.group({
      id: [''],
      userId: [this.authService.getAuth().currentUser.uid],
      emailProtetico: ['', [Validators.required]],
      tipoProtese: ['', [Validators.required]],
      subTipoProtese: ['', [Validators.required]],
      picture: ['https://image.flaticon.com/icons/png/512/103/103386.png'],
      observacao: ['', [Validators.required]],
      status: ['', [Validators.required]],
      criadoEm: [new Date().getTime()]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  OnDestroy() {
    if (this.pedidoSubscription) {
      this.pedidoSubscription.unsubscribe();
    }
  }

  loadPedido() {
    this.pedidoSubscription = this.pedidoService.getPedido(this.pedidoId).subscribe(data => {
      this.pedido = data;
    });
  }

  async savePedido() {
    await this.presentLoading();
    // pegando o id do usuário
    this.pedido.userId = this.authService.getAuth().currentUser.uid;
    // se já existir produto, atualiza. Se não existe, cria um novo produto.
    if (this.pedidoId) {
      try {
        await this.pedidoService.updatePedido(this.pedidoId, this.novoPedido.value);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home-dentista');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.pedido.criadoEm = new Date().getTime();

      try {
        await this.pedidoService.addPedido(this.novoPedido.value);
        this.presentToast('<center>' + 'Pedido encaminhado ao Protetico ' + '</center>');
        await this.loading.dismiss();
        this.navCtrl.navigateBack('/home-dentista');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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
