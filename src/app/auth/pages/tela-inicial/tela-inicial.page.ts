import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss']
})
export class TelaInicialPage implements OnInit {
  constructor(
    private router: Router,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {}

  // coleção de imagens e títulos
  slides = [
    {
      img: 'assets/img/dentista.png',
      titulo: 'ProtoLAB é essencial para você<br>profissional da odontologia'
    },
    {
      img: 'assets/img/protese.png',
      titulo: 'Tenha o controle de todas as<br>próteses solicitadas'
    },
    {
      img: 'assets/img/dente.png',
      titulo: 'Desde o pedido até a entrega.<br>Faça já seu cadastro!'
    }
  ];
  // Chama a tela de login
  openLogin() {
    this.router.navigate(['/login']);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }
}
