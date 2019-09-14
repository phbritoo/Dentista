import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  novoPedido() {
    this.router.navigateByUrl('/novo-pedido');
  }
}
