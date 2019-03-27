import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

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
    console.log(this.creds);
    this.navCtrl.navigateRoot('/categorias');
  }
}
