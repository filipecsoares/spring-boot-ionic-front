import { Component } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public auth: AuthService,
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) {}

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
    this.auth.authenticate(this.creds).subscribe(
      response => {
        console.log(response.headers.get("Authorization"));
        this.navCtrl.navigateRoot("/categorias");
      },
      error => {}
    );
  }
}
