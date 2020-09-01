import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FinanceAccountService } from 'src/app/services/finance-account/finance-account.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-create-finance-account',
  templateUrl: './create-finance-account.component.html',
  styleUrls: ['./create-finance-account.component.scss'],
})
export class CreateFinanceAccountComponent implements OnInit {
  state: IRequestFinanceAccount = {
    name: null,
    type: null,
    description: null
  }
  isLoading: boolean = false;
  constructor(
    private financeAccount: FinanceAccountService,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }
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
  async onSubmitNewAccount() {
    this.present();
    const token: string = await this.auth.getToken();
    this.financeAccount.CreateFinanceAccount({
      name: this.state.name,
      description: this.state.description,
      type: this.state.type
    }, token)
      .subscribe((response) => {
        // alert
        this.dismiss();
        console.log(response);
      }, (error) => {
        this.dismiss();
        this.presentAlert(error.status, error.error.message);
      }, () => {
        this.dismiss();
        console.log("complete")
      })
    this.closeModal();
  }
  closeModal() {
    this.modalCtrl.dismiss();
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
  ngOnInit() { }

}
