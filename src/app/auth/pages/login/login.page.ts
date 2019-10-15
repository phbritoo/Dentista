import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { User } from './../interfaces/user';
import { Router } from '@angular/router';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  ToastController,
  LoadingController,
  NavController,
  MenuController,
  AlertController
} from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private zone: NgZone,
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
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
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

  // menu
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  // ALERT DE ESQEUCEU A SENHA
  // Redefinição de senha implementada e funcional, posteriormente será realizado melhorias
  // Foi implementado o botão de cancelar caso o usuario precise desistir
  // Hoje não esta sendo validado se o email e valido e esta com bug caso seja digitado qualquer caracter no text

  async abrirPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Esqueceu a senha?',
      animated: true,
      inputs: [
        {
          name: 'input',
          placeholder: 'Informe seu email'
        }
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: data => {
            // Essa porra ai foi chata dms pra fazer na moral estilei valendo pq em nenhum lugar tem aula de alert controlle.
            // tslint:disable-next-line:max-line-length
            const regexpNumber: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!regexpNumber.test(data.input)) {
              this.presentToast(
                '<center>' + 'E-mail inválido ou Não cadastrado na base' + '</center>'
              );
              console.log('Nada será enviado');
            } else {
              this.authService.resetPassword(data.input);
              this.presentToast(
                '<center>' +
                  'O link para redefinição de senha será enviado para seu e-mail.' +
                  '</center>'
              );
              console.log('Envio com sucesso');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // ALERT DE CADASTRO
  async cadastro() {
    const alert = await this.alertCtrl.create({
      header: 'Cadastrar um ...',
      buttons: [
        {
          text: 'Dentista',
          handler: () => {
            this.zone.run(async () => {
              await this.navCtrl.navigateForward('/cadastro-dentista');
            });
          }
        },
        {
          text: 'Protético',
          handler: () => {
            this.zone.run(async () => {
              await this.navCtrl.navigateForward('/cadastro-protetico');
            });
          }
        }
      ]
    });

    await alert.present();
  }
  // cadastrarProtetico() {
  //   this.router.navigate(['/cadastro-protetico']);
  // }
  // cadastrarDentista() {
  //   this.router.navigate(['/cadastro-dentista']);
  // }
}
