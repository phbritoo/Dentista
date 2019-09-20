import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss']
})
export class ModalPedidoPage {
  myParameter: boolean;
  myOtherParameter: Date;
  constructor(private modalController: ModalController, private navParams: NavParams) {}
  ionViewWillEnter() {
    this.myParameter = this.navParams.get('aParameter');
    this.myOtherParameter = this.navParams.get('otherParameter');
  }
  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
}
