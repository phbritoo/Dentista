import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.page.html',
  styleUrls: ['./editar-pedido.page.scss']
})
export class EditarPedidoPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  cancelar() {
    this.router.navigate(['/home-dentista']);
  }
}
