import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  private loading: any;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  // validacoes do formulario
  private createForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.formLogin.value);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
    // Provavelmente é aqui que iremos implementar o método
    // para buscar o isDentista do usuário.
    // Pode ser viável usar a lógica:
    // Existe na coleção "Dentista"? Se sim, vai pra home-dentista
    // senão, vai pra home-protetico
    this.router.navigate(['/home-dentista']);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.formLogin.get('senha') as FormControl;
  }
  fazerLogin(): void {
    console.log('formLogin: ', this.formLogin.value);
  }
  cadastrarProtetico() {
    this.router.navigateByUrl('/cadastro-protetico');
  }
  cadastrarDentista() {
    this.router.navigateByUrl('/cadastro-dentista');
  }
  esqueceuSenha() {
    this.router.navigateByUrl('/');
  }
}
