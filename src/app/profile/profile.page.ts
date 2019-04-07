import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { StorageService } from "src/services/storage.service";
import { ClienteDTO } from "src/models/cliente.dto";
import { API_CONFIG } from "src/config/api.config";
import { ClienteService } from "../../services/domain/cliente.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  cliente: ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.cliente = response;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot("/home");
          }
        }
      );
    } else {
      this.navCtrl.navigateRoot("/home");
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${
          this.cliente.id
        }.jpg`;
      },
      error => {}
    );
  }
}
