import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  private loading: any;
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.userCollection = this.afs.collection('User');
    this.users = this.userCollection.valueChanges();
  }
  // validacoes do formulario
  private createForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.formLogin.value);
      // pegando o Uid do usuário que acabou de logar e jogando no console
      // usando o getAuth do authService (AngularFireAuth)
      // com o Uid, temos que acessar a collection
      const newUser = this.authService.getAuth().currentUser.uid;
      console.log(newUser);
      // Provavelmente é aqui que iremos implementar o método
      // para buscar o isDentista do usuário.
      // Pode ser viável usar a lógica:
      // Existe na coleção "Dentista"? Se sim, vai pra home-dentista
      // senão, vai pra home-protetico
      this.router.navigate(['/home-dentista']);
    } catch (error) {
      this.presentToast('<center>' + 'E-mail/Senha incorretos' + '</center>');
      this.router.navigate(['/login']);
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

  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.formLogin.get('senha') as FormControl;
  }
  cadastrarProtetico() {
    this.router.navigate(['/cadastro-protetico']);
  }
  cadastrarDentista() {
    this.router.navigate(['/cadastro-dentista']);
  }
  esqueceuSenha() {
    this.router.navigate(['/']);
  }
}
