import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../../../core/services/user';


@Component({
  selector: 'app-cadastro-protetico',
  templateUrl: './cadastro-protetico.page.html',
  styleUrls: ['./cadastro-protetico.page.scss']
})
export class CadastroProteticoPage implements OnInit {
  cadastrarProtetico: FormGroup;
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
    this.cadastrarProtetico = this.fb.group({
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]],
      desc: ['Protético'],
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
      const newUser = await this.authService.register(this.cadastrarProtetico.value);
      await this.afs.collection('GildoTesteUser').doc(newUser.user.uid).set(this.cadastrarProtetico.value);
    } catch (error) {
      this.presentToast(error.message);
      console.log(error.message);
    } finally {
      this.loading.dismiss();
    }
    this.router.navigate(['/login']);
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

  efetuarCadastroProtetico(): void {
    console.log('cadastrarProtetico: ', this.cadastrarProtetico.value);
  }

  botaoVoltar() {
    this.router.navigateByUrl('/login');
  }
}
