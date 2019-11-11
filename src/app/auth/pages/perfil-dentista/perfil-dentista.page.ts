import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-perfil-dentista',
  templateUrl: './perfil-dentista.page.html',
  styleUrls: ['./perfil-dentista.page.scss']
})
export class PerfilDentistaPage implements OnInit {
  model;
  atualizarDentista: FormGroup;
  public user: User = {};
  private loading: any;

  public userLogado: any;
  public mainuser: AngularFirestoreDocument;
  sub;
  nome;
  cpf;
  cro;
  telefone;
  data;
  email;

  dateChanged(date) {
    this.atualizarDentista.patchValue({
      data: date.detail.value.substring(0, 10)
    });
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.userLogado = this.authService.getAuth().currentUser.uid;
    this.mainuser = this.afs.doc('User/' + this.userLogado);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.nome = event.nome;
      this.cpf = event.cpf;
      this.cro = event.cro;
      this.telefone = event.telefone;
      this.data = event.data;
      this.email = event.email;
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.atualizarDentista.controls.cpf.disable();
    this.atualizarDentista.controls.cro.disable();
    this.atualizarDentista.controls.data.disable();
    this.atualizarDentista.controls.email.disable();
  }
  ionViewDidLeave() {
    this.createForm();
  }
  // validacoes do formulario
  private createForm(): void {
    this.atualizarDentista = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      cro: ['', [Validators.required]],
      // cro: [{ value: '' }],
      telefone: ['', [Validators.required, Validators.minLength(14)]],
      data: ['', [Validators.required]],
      email: ['', [Validators.required]],
      criadoEm: [new Date().getTime()],
      isDentista: [true]
    });
  }
  // mostrar mensagem de erro no ion-note
  get name(): FormControl {
    return this.atualizarDentista.get('nome') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get phone(): FormControl {
    return this.atualizarDentista.get('telefone') as FormControl;
  }

  updateNomeMenu(nome: string) {
    this.afa.auth.currentUser.updateProfile({ displayName: this.nome });
  }

  async update() {
    if (!this.nome) {
      return this.presentToast('<center>' + 'Informe seu nome !' + '</center>');
    }
    if (!this.telefone) {
      return this.presentToast('<center>' + 'Informe seu telefone !' + '</center>');
    }
    try {
      await this.mainuser.update({
        nome: this.nome,
        telefone: this.telefone
      });
    } catch (error) {
      return await this.presentToast('<center>' + 'Error ao atualizar !' + '</center>');
    }
    this.updateNomeMenu(this.nome);
    this.presentToast('<center>' + 'Perfil atualizado com sucesso !' + '</center>');
    // this.router.navigateBack(['/home-dentista']);
    this.navCtrl.navigateBack(['/home-dentista']);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 4000 });
    toast.present();
  }
  cancelar() {
    this.router.navigate(['/home-dentista']);
    // this.editarPedido.disable();
  }
}
