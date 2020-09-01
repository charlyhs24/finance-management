import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  isLoading: boolean = false;
  constructor(
    private api: ApiService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
  }
  async presentAlert(status: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: status,
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async present() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  async signin(body: IAuth): Promise<void> {
    this.present();
    const token: string = await this.storage.get("Authorization")
    this.api.post('https://development.paper.id:3500/test-case/api/v1/login', token, body).subscribe((response: IResAuth) => {
      this.storage.set('Authorization', response.token);
      this.storage.set('username', response.name);
      this.storage.set('last_login', response.last_login);
    }, (error) => {
      this.dismiss();
      this.presentAlert(error.status, error.error.message);
    }, () => {
      console.log("Login success");
      this.dismiss();
      this.navCtrl.navigateRoot('/dashboard');
    })
  }
  async signout(): Promise<void> {
    try {
      this.present();
      await this.storage.remove('Authorization');
      await this.storage.remove('username');
      await this.storage.remove('last_login');
      this.dismiss();
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      this.dismiss();
      console.log("error", error)
    }

  }
  async isLogedIn(): Promise<boolean> {
    const token = await this.storage.get("Authorization")
    if (!token) {
      return false;
    }
    return true;
  }
  async getToken() {
    return await this.storage.get('Authorization')
  }
}
