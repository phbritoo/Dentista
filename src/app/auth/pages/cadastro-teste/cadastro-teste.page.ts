import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/shared/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastro-teste',
  templateUrl: './cadastro-teste.page.html',
  styleUrls: ['./cadastro-teste.page.scss'],
})
export class CadastroTestePage implements OnInit {

  public user: any = {};
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async register() {
    try {
      const newUser = await this.afa.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      await this.afs.collection('GildoTesteUser').doc(newUser.user.uid).set(this.user);
      console.log('Cadastro Efetuado com sucesso');
    } catch (error) {
      console.error(error);
    }
  }
}
