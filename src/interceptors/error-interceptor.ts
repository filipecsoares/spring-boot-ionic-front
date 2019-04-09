import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { StorageService } from "src/services/storage.service";
import { AlertController } from "@ionic/angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error, caught) => {
        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        console.log("Erro detectado pelo interceptor:");
        console.log(errorObj);

        switch (errorObj.status) {
          case 401:
            this.handle401();
            break;
          case 403:
            this.handle403();
            break;
          default:
            this.handleDefaultError(errorObj);
        }

        return Observable.throw(errorObj);
      })
    ) as any;
  }

  async handle401() {
    let alert = await this.alertCtrl.create({
      header: "Erro 401: falha de autenticação",
      message: "Email ou senha incorretos",
      buttons: [
        {
          text: "Ok"
        }
      ]
    });
    await alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  async handleDefaultError(errorObj) {
    let alert = await this.alertCtrl.create({
      header: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      buttons: [
        {
          text: "Ok"
        }
      ]
    });
    await alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
