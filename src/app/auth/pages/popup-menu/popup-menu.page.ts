import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.page.html',
  styleUrls: ['./popup-menu.page.scss']
})
export class PopupMenuPage implements OnInit {
  openMenu = false;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  togglePopupMenu() {
    // return (this.openMenu = !this.openMenu);
    this.router.navigate(['/novo-pedido']);
  }
  logout() {
    this.authService.logout();
  }
}
