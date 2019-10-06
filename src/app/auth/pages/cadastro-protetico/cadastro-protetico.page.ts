import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-cadastro-protetico',
  templateUrl: './cadastro-protetico.page.html',
  styleUrls: ['./cadastro-protetico.page.scss']
})
export class CadastroProteticoPage implements OnInit {
  cadastrarProtetico: FormGroup;
  public user: User = {};
  private loading: any;

  dateChanged(date) {
    this.cadastrarProtetico.patchValue({
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
  }

  ionViewDidLeave() {
    this.createForm();
  }

  // validacoes do formulario
  private createForm(): void {
    this.cadastrarProtetico = this.fb.group({
      telefone: ['', [Validators.required, Validators.minLength(15)]],
      cpf: ['', [Validators.required, Validators.minLength(14)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]],
      criadoEm: [new Date().getTime()],
      isDentista: [false]
    });
  }
  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.cadastrarProtetico.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.cadastrarProtetico.get('senha') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get nome(): FormControl {
    return this.cadastrarProtetico.get('nome') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get cpf(): FormControl {
    return this.cadastrarProtetico.get('cpf') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get telefone(): FormControl {
    return this.cadastrarProtetico.get('telefone') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get data(): FormControl {
    return this.cadastrarProtetico.get('data') as FormControl;
  }
  async register() {
    await this.presentLoading();
    try {
      const newUser = await this.authService.register(this.cadastrarProtetico.value);

      await this.afs
        .collection('User')
        .doc(newUser.user.uid)
        .set(this.cadastrarProtetico.value);
      this.presentToast('<center>' + 'Bem vindo, ' + this.nome.value + '</center>');

      this.router.navigate(['/home-protetico']);
    } catch (error) {
      console.dir(error);
      this.router.navigate(['/cadastro-protetico']);
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
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  botaoVoltar() {
    this.router.navigate(['/login']);
  }
}
