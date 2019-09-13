import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-cadastro-dentista',
  templateUrl: './cadastro-dentista.page.html',
  styleUrls: ['./cadastro-dentista.page.scss']
})
export class CadastroDentistaPage implements OnInit {
  cadastrarDentista: FormGroup;
  public user: User = {};
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afs: AngularFirestore,
    private afa: AngularFireAuth

  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  // validacoes do formulario
  private createForm(): void {
    this.cadastrarDentista = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      cro: ['', [Validators.required, Validators.minLength(4)]],
      data: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      const newUser = await this.authService.register(this.cadastrarDentista.value);
      await this.afs.collection('GildoTesteUser').doc(newUser.user.uid).set(this.cadastrarDentista.value);
    } catch (error) {
      this.presentToast(error.message);
      console.log(error.message);
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

  // mostrar mensagem de erro no ion-note
  get nome(): FormControl {
    return this.cadastrarDentista.get('nome') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get cpf(): FormControl {
    return this.cadastrarDentista.get('cpf') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get cro(): FormControl {
    return this.cadastrarDentista.get('cro') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get data(): FormControl {
    return this.cadastrarDentista.get('data') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get telefone(): FormControl {
    return this.cadastrarDentista.get('telefone') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.cadastrarDentista.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.cadastrarDentista.get('senha') as FormControl;
  }

  efetuarCadastroDentista(): void {
    console.log('cadastrarDentista: ', this.cadastrarDentista.value);
  }

  botaoVoltar() {
    this.router.navigateByUrl('/login');
  }
}
