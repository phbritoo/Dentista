import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Categoria } from '../interfaces/categoria';
import { Tipo } from '../interfaces/tipo';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.page.html',
  styleUrls: ['./editar-pedido.page.scss']
})
export class EditarPedidoPage implements OnInit, OnDestroy {
  editarPedido: FormGroup;
  public pedido: Pedido = {};
  public pedidoClicado: any;
  public mainpedido: AngularFirestoreDocument;
  private pedidoId: string = null;
  private loading: any;
  private pedidoSubscription: Subscription;
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  categoriaCollection: AngularFirestoreCollection<Categoria>;
  tipoCollection: AngularFirestoreCollection<Tipo>;
  categorias: Observable<Categoria[]>;
  tipos: Observable<Tipo[]>;
  sub;
  nomeProtetico;
  nomePaciente;
  tipoProtese;
  subTipoProtese;
  criadoEm;
  observacao;
  status;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.pedidoId = this.activatedRoute.snapshot.params.id;
    if (this.pedidoId) {
      this.loadPedido();
    }
    this.initializeApp();
  }

  initializeApp() {
    this.mainpedido = this.afs.doc('Pedidos/' + this.pedidoId);
    this.sub = this.mainpedido.valueChanges().subscribe(event => {
      this.nomeProtetico = event.nomeProtetico;
      this.nomePaciente = event.nomePaciente;
      this.tipoProtese = event.tipoProtese;
      this.subTipoProtese = event.subTipoProtese;
      this.criadoEm = event.criadoEm;
      this.observacao = event.observacao;
      this.status = event.status;
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.editarPedido.controls.nomeProtetico.disable();
    this.editarPedido.controls.tipoProtese.disable();
    this.editarPedido.controls.subTipoProtese.disable();
  }
  ngOnDestroy() {
    if (this.pedidoSubscription) {
      this.pedidoSubscription.unsubscribe();
    }
  }
  ionViewDidLeave() {
    this.createForm();
  }

  // validacoes do formulario
  private createForm(): void {
    this.editarPedido = this.fb.group({
      nomeProtetico: ['', [Validators.required]],
      nomePaciente: ['', [Validators.required]],
      tipoProtese: ['', [Validators.required]],
      subTipoProtese: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      status: ['', [Validators.required]],
      criadoEm: ['']
    });
  }

  // mostrar mensagem de erro no ion-note
  get nomeProt(): FormControl {
    return this.editarPedido.get('nomeProtetico') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get nomePac(): FormControl {
    return this.editarPedido.get('nomePaciente') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get tipo(): FormControl {
    return this.editarPedido.get('tipoProtese') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get subTipo(): FormControl {
    return this.editarPedido.get('subTipoProtese') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get obs(): FormControl {
    return this.editarPedido.get('observacao') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get stat(): FormControl {
    return this.editarPedido.get('status') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get criacao(): FormControl {
    return this.editarPedido.get('criadoEm') as FormControl;
  }

  loadPedido() {
    this.pedidoSubscription = this.pedidoService.getPedido(this.pedidoId).subscribe(data => {
      this.pedido = data;
    });
  }

  async update() {
    if (!this.nomePaciente) {
      return this.presentToast('<center>' + 'Informe o nome do paciente !' + '</center>');
    }
    if (!this.tipoProtese) {
      return this.presentToast('<center>' + 'Informe o tipo da Prótese !' + '</center>');
    }
    if (!this.subTipoProtese) {
      return this.presentToast('<center>' + 'Informe o subtipo da Prótese !' + '</center>');
    }
    if (!this.observacao) {
      return this.presentToast('<center>' + 'Escreva observações importantes !' + '</center>');
    }
    if (!this.status) {
      return this.presentToast('<center>' + 'Escolha o Status !' + '</center>');
    }
    try {
      await this.mainpedido.update({
        nomePaciente: this.nomePaciente,
        tipoProtese: this.tipoProtese,
        subTipoProtese: this.subTipoProtese,
        observacao: this.observacao,
        status: this.status
      });
    } catch (error) {
      return await this.presentToast('<center>' + 'Error ao atualizar !' + '</center>');
    }
    this.presentToast('<center>' + 'Pedido atualizado com sucesso !' + '</center>');
    // this.router.navigateBack(['/home-dentista']);
    this.navCtrl.navigateBack(['/home-dentista']);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  cancelar() {
    this.router.navigate(['/home-dentista']);
    // this.editarPedido.disable();
  }
}
