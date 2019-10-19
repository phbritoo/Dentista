import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';

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
    private afa: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.atualizarDentista.controls.cpf.disable();
    this.atualizarDentista.controls.cro.disable();
  }
  ionViewDidLeave() {
    this.createForm();
  }
  // validacoes do formulario
  private createForm(): void {
    this.atualizarDentista = this.fb.group({
      telefone: ['', [Validators.required, Validators.minLength(15)]],
      cpf: ['123.123.123-00', [Validators.required, Validators.minLength(14)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]],
      cro: ['1234/PE', [Validators.required, Validators.minLength(4)]],
      criadoEm: [new Date().getTime()],
      isDentista: [true]
    });
  }
  // mostrar mensagem de erro no ion-note
  get nome(): FormControl {
    return this.atualizarDentista.get('nome') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get cpf(): FormControl {
    return this.atualizarDentista.get('cpf') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get cro(): FormControl {
    return this.atualizarDentista.get('cro') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get data(): FormControl {
    return this.atualizarDentista.get('data') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get telefone(): FormControl {
    return this.atualizarDentista.get('telefone') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.atualizarDentista.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.atualizarDentista.get('senha') as FormControl;
  }

  async register() {
    await this.presentLoading();
    try {
      const newUser = await this.authService.register(this.atualizarDentista.value);
      await this.afs
        .collection('User')
        .doc(newUser.user.uid)
        .set(this.atualizarDentista.value);
      this.presentToast('<center>' + 'Bem vindo, Dr. ' + this.nome.value + '</center>');
      console.log(this.atualizarDentista.value);
      this.router.navigate(['/home-dentista']);
    } catch (error) {
      console.dir(error);
      this.router.navigate(['/cadastro-dentista']);
      this.presentToast('<center>' + 'E-mail já existente' + '</center>');
    } finally {
      this.loading.dismiss();
    }
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
