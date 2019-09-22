import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  // titulo de cada select-option
  protetico: any = {
    header: 'Selecione o Protetico'
  };
  tipoProtese: any = {
    header: 'Categoria da Protese'
  };
  subTipo: any = {
    header: 'Tipo de Protese'
  };
  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.pedidoId = this.activatedRoute.snapshot.params.id;
    if (this.pedidoId) {
      this.loadPedido();
    }
    this.tipoProteses = this.getTiposProteses();
    this.subTipoProteses = this.getSubTipoProteses();
    this.tipoProteseControl = fb.control(null, Validators.required);
    this.subTipoProtesesControl = fb.control(null, Validators.required);
    this.subTipoProtesesControl.disable();
    this.novoPedido = fb.group({
      tipoProtese: this.tipoProteseControl,
      subTipoProtese: this.subTipoProtesesControl
    });
  }
  // validacoes do formulario
  private createForm(): void {
    this.novoPedido = this.fb.group({
      userId: [this.authService.getAuth().currentUser.uid],
      emailProtetico: ['', [Validators.required]],
      tipoProtese: ['', [Validators.required]],
      subTipoProtese: ['', [Validators.required]],
      picture: ['https://image.flaticon.com/icons/png/512/103/103386.png'],
      observacao: ['', [Validators.required]],
      status: ['PENDENTE'],
      criadoEm: [new Date().getTime()]
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
      { id: 1, name: 'Total' },
      { id: 2, name: 'Parcial removível' },
      { id: 3, name: 'Sobre implante' },
      { id: 4, name: 'Fixa' }
    ];
  }

  getSubTipoProteses(): SubTipoProtese[] {
    return [
      { id: 10, name: 'Removível', tipoProtese: { id: 1, name: 'Total' } },
      { id: 11, name: 'Protocolo', tipoProtese: { id: 1, name: 'Total' } },
      { id: 12, name: 'Overdenture', tipoProtese: { id: 1, name: 'Total' } },
      { id: 13, name: 'Com encaixes', tipoProtese: { id: 2, name: 'Parcial removível' } },
      { id: 14, name: 'Convencional', tipoProtese: { id: 2, name: 'Parcial removível' } },
      { id: 15, name: 'Unitária', tipoProtese: { id: 3, name: 'Sobre implante' } },
      { id: 16, name: 'Múltipla', tipoProtese: { id: 3, name: 'Sobre implante' } },
      { id: 20, name: 'Protocolo', tipoProtese: { id: 3, name: 'Sobre implante' } },
      { id: 21, name: 'Overdenture', tipoProtese: { id: 3, name: 'Sobre implante' } },
      { id: 22, name: 'Metalocerâmica', tipoProtese: { id: 4, name: 'Fixa' } },
      { id: 23, name: 'Zircônia', tipoProtese: { id: 4, name: 'Fixa' } },
      { id: 24, name: 'Dissilicato de lítio', tipoProtese: { id: 4, name: 'Fixa' } },
      { id: 25, name: 'Metálica', tipoProtese: { id: 4, name: 'Fixa' } },
      { id: 25, name: 'Cerômero', tipoProtese: { id: 4, name: 'Fixa' } },
      { id: 26, name: 'Resina acrílica', tipoProtese: { id: 4, name: 'Fixa' } }
    ];
  }

  ngOnInit(): void {
    this.createForm();
    this.userCollection = this.afs.collection('User');
    this.users = this.userCollection.valueChanges();
  }

  ngOnDestroy() {
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
