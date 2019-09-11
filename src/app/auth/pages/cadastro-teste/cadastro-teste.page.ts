import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/shared/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro-teste',
  templateUrl: './cadastro-teste.page.html',
  styleUrls: ['./cadastro-teste.page.scss'],
})
export class CadastroTestePage implements OnInit {

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

}
