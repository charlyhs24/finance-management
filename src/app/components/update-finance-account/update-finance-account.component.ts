import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FinanceAccountService } from 'src/app/services/finance-account/finance-account.service';

@Component({
  selector: 'app-update-finance-account',
  templateUrl: './update-finance-account.component.html',
  styleUrls: ['./update-finance-account.component.scss'],
})
export class UpdateFinanceAccountComponent implements OnInit {
  state: IRequestFinanceAccount = {
    name: null,
    type: null,
    description: null
  }
  financeAccountId: number = null;
  isLoading: boolean = false;
  constructor(
    private financeAccount: FinanceAccountService,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.financeAccountId = this.navParams.get("id");
    this.state = {
      name: this.navParams.get("name"),
      description: this.navParams.get("Description"),
      type: this.navParams.get("type")
    }
  }
  async onSubmitNewAccount() {
    this.present();
    const token: string = await this.auth.getToken();
    this.financeAccount.UpdateFinanceAccount({
      name: this.state.name,
      description: this.state.description,
      type: this.state.type
    }, token, this.financeAccountId)
      .subscribe((response) => {
        this.dismiss();
        console.log(response);
      }, (error) => {
        this.dismiss();
        this.presentAlert(error.status, error.error.message);
      }, () => {
        this.dismiss();
        console.log("complete")
      });
    this.closeModal();
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
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
