import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.page.html',
  styleUrls: ['./popup-menu.page.scss'],
})
export class PopupMenuPage implements OnInit {
  openMenu: Boolean = false;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

}
