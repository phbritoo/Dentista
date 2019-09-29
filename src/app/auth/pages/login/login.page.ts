import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  ToastController,
  LoadingController,
  NavController,
  MenuController,
  AlertController
} from '@ionic/angular';
import { User } from '../interfaces/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  tipoUsuario: boolean;
  formLogin: FormGroup;
  private loading: any;
  userCollection2: AngularFirestoreCollection<User>;
  userCollection: AngularFirestoreCollection<User>;
  users: any;
  user: User;
  passwordtype = 'password';
  passwordshow: boolean;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    private afs: AngularFirestore
  ) {
    // NO MOMENTO ESTAS LINHAS COMENTADAS NÃO ESTÃO FAZENDO SENTIDO
    // this.userCollection = afs.collection<User>('User');
    // .snapshotChanges() retorna DocumentChangeAction[], que contém
    // várias informações sobre "o que aconteceu" com cada mudança. Se quisermos
    // dar um get nos dados e/ou no id temos que mexer no map operator.
    /* this.userCollection = this.afs.collection('User');

    this.userCollection
    this.users.pipe(
      map(changes => {
        const data = changes.payload.data();
        const id = changes.payload.id;
        return { id, ...data };
      })
    ).subscribe(changes => {
      console.log(changes.id);
    });
    console.log(this.users); */
  }

  tooglepassword() {
    if (this.passwordshow) {
      this.passwordshow = false;
      this.passwordtype = 'password';
    } else {
      this.passwordshow = true;
      this.passwordtype = 'text';
    }
  }
  ngOnInit(): void {
    this.createForm();
    // this.userCollection = this.afs.collection('User');
    // this.users = this.userCollection.valueChanges();
  }
  // validacoes do formulario
  private createForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getTipoUsuario() {
    return this.tipoUsuario;
  }

  async login() {
    // levanta o loading e só saia quando o método acabar
    await this.presentLoading();
    // cria variável "tipoUsuario" booleana para ser usada dentro da estrutura condicional
    // e receber o isDentista do usário logado

    // início do try catch
    try {
      // verifica no firebase se existe esse login e senha digitado no formulário
      await this.authService.login(this.formLogin.value);

      // pega o Uid do usuário em Authentication que acabou de logar e jogando na constante newUser
      const newUser = this.authService.getAuth().currentUser.uid;

      // Vale lembrar que o id da coleção (FireStore) deste usuário é igual ao Uid do Authentication do usuário logado.
      // O id da coleção é equivalente a uma Primary Key do SQL convencional
      // Atribui a constante userRef a referência do id documento do FireStore (cadastro do usuário logado).
      const userRef = this.afs.collection('User').doc(newUser);

      // Busca no documento específico que tenha o doc id igual ao Uid do usuário logado
      userRef
        .get()
        .toPromise()
        .then(doc => {
          if (!doc.exists) {
            console.log('Não existe documento');
          } else {
            this.tipoUsuario = doc.get('isDentista');
            console.log('Esse usuário é dentista?', this.tipoUsuario);

            // condicional que pega o booleano "tipoUsuario" para redirecionar o user para home correta
            if (this.tipoUsuario === true) {
              console.log('É dentista');
              this.router.navigate(['/home-dentista']);
            } else {
              console.log('É Protético');
              this.router.navigate(['/home-protetico']);
            }
          }
        })
        .catch(err => {
          console.log('Erro ao recuperar documento', err);
        });
    } catch (error) {
      this.presentToast('<center>' + 'E-mail/Senha incorretos' + '</center>');
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
  fazerLogin(): void {
    console.log('formLogin: ', this.formLogin.value);
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

  // menu

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
