import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

class TipoProtese {
  public id: number;
  public name: string;
}

class SubTipoProtese {
  public id: number;
  public name: string;
  public tipoProtese: TipoProtese;
}
@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.page.html',
  styleUrls: ['./novo-pedido.page.scss']
})
export class NovoPedidoPage implements OnInit {
  tipoProteses: TipoProtese[];
  subTipoProteses: SubTipoProtese[];
  subTipoProtesesByTipoProtese: SubTipoProtese[] = [];
  tipoProteseControl: FormControl;
  subTipoProtesesControl: FormControl;
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
      this.tipoProteses = this.getTiposProteses();
      this.subTipoProteses = this.getSubTipoProteses();
      this.tipoProteseControl = this.fb.control(null, Validators.required);
      this.subTipoProtesesControl = this.fb.control(null, Validators.required);
      this.subTipoProtesesControl.disable();
      this.novoPedido = this.fb.group({
        id: [''],
        userId: [''],
        emailProtetico: ['', [Validators.required]],
        tipoProtese: ['', [Validators.required]],
        subTipoProtese: ['', [Validators.required]],
        picture: ['https://image.flaticon.com/icons/png/512/103/103386.png'],
        observacao: ['', [Validators.required]],
        criadoEm: [new Date().getTime()],
      });
    }

  // select de proteses
  tipoProteseChange(event) {
    const tipoProtese = event.target.value;

    this.subTipoProtesesByTipoProtese = this.subTipoProteses.filter(subTipoProtese => {
      return subTipoProtese.tipoProtese.id === tipoProtese;
    });
    this.subTipoProtesesControl.reset();
    this.subTipoProtesesControl.enable();
  }

  reset() {
    this.subTipoProtesesControl.reset();
    this.tipoProteseControl.reset();
    this.subTipoProtesesControl.disable();
  }

  getTiposProteses(): TipoProtese[] {
    return [
      { id: 1, name: 'TOTAL' },
      { id: 2, name: 'PARCIAL REMOVÍVEL' },
      { id: 3, name: 'SOBRE IMPLANTE' },
      { id: 4, name: 'FIXA' }
    ];
  }

  getSubTipoProteses(): SubTipoProtese[] {
    return [
      { id: 10, name: 'Removível', tipoProtese: { id: 1, name: 'TOTAL' } },
      { id: 11, name: 'Protocolo', tipoProtese: { id: 1, name: 'TOTAL' } },
      { id: 12, name: 'Overdenture', tipoProtese: { id: 1, name: 'TOTAL' } },
      { id: 13, name: 'Com encaixes', tipoProtese: { id: 2, name: 'PARCIAL REMOVÍVEL' } },
      { id: 14, name: 'Convencional', tipoProtese: { id: 2, name: 'PARCIAL REMOVÍVEL' } },
      { id: 15, name: 'Unitária', tipoProtese: { id: 3, name: 'SOBRE IMPLANTE' } },
      { id: 16, name: 'Múltipla', tipoProtese: { id: 3, name: 'SOBRE IMPLANTE' } },
      { id: 20, name: 'Protocolo', tipoProtese: { id: 3, name: 'SOBRE IMPLANTE' } },
      { id: 21, name: 'Overdenture', tipoProtese: { id: 3, name: 'SOBRE IMPLANTE' } },
      { id: 22, name: 'Metalocerâmica', tipoProtese: { id: 4, name: 'FIXA' } },
      { id: 23, name: 'Zircônia', tipoProtese: { id: 4, name: 'FIXA' } },
      { id: 24, name: 'Dissilicato de Lítio', tipoProtese: { id: 4, name: 'FIXA' } },
      { id: 25, name: 'Metálica', tipoProtese: { id: 4, name: 'FIXA' } },
      { id: 26, name: 'Cerômero', tipoProtese: { id: 4, name: 'FIXA' } },
      { id: 27, name: 'Resina Acrílica', tipoProtese: { id: 4, name: 'FIXA' } }
    ];
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

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.pedido.criadoEm = new Date().getTime();

      try {
        await this.pedidoService.addPedido(this.novoPedido.value);
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
