import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class IndexPage implements OnInit {
  constructor(private router: Router) {}

  slides = [
    {
      img: 'assets/img/dentista.png',
      titulo: 'ProtoLAB é essencial pra você<br>profissional da odontologia'
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
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {}
}
