import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { UserService } from '../../../core/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-protetico',
  templateUrl: './cadastro-protetico.page.html',
  styleUrls: ['./cadastro-protetico.page.scss']
})
export class CadastroProteticoPage implements OnInit {

  email: string = '';
  senha: string = '';
  nome: string
  telefone: string
  cpf: string
  data: string
  desc: string = 'Protético';


  cadastrarProtetico: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController) { }

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
      data: ['', [Validators.required]]
    });
  }

  // mostrar mensagem de erro no ion-note
  /** get email(): FormControl {
     return this.cadastrarProtetico.get('email') as FormControl;
   }
   // mostrar mensagem de erro no ion-note
   get senha(): FormControl {
     return this.cadastrarProtetico.get('senha') as FormControl;
   }
   // mostrar mensagem de erro no ion-note
   /**  get nome(): FormControl {
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
  }*/

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  async efetuarCadastroProtetico() {
    const { email, senha, nome, desc, telefone, cpf, data } = this;

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        senha
      );

      this.afstore.doc(`protetico/${res.user.uid}`).set({
        email,
        nome,
        desc,
        telefone,
        cpf,
        data
      });


      /**
      this.user.setUser({
        email,
        uid: res.user.uid,
        nome,
        desc,
        telefone,
        cpf,
        data
      });*/

      this.presentAlert('Sucesso', 'Agora você está registrado!');
      this.router.navigate(['/login']);
    } catch (error) {
      console.dir(error);
    }
  }


  /**  efetuarCadastroProtetico(): void {
    console.log('cadastrarProtetico: ', this.cadastrarProtetico.value);
  } */

  botaoVoltar() {
    this.router.navigateByUrl('/login');
  }
}
