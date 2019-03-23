import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  }

  ionViewWillEnter() {
    this.menuCtrl.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = false;
    });
  }

  ionViewDidLeave() {
    this.menuCtrl.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = true;
    });
  }

  login() {
    this.navCtrl.navigateRoot('/categorias');
  }
}
