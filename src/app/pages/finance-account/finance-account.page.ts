import { Component, OnInit } from '@angular/core';
import { FinanceAccountService } from 'src/app/services/finance-account/finance-account.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { CreateFinanceAccountComponent } from 'src/app/components/create-finance-account/create-finance-account.component';
import { UpdateFinanceAccountComponent } from 'src/app/components/update-finance-account/update-finance-account.component';

@Component({
  selector: 'app-finance-account',
  templateUrl: './finance-account.page.html',
  styleUrls: ['./finance-account.page.scss'],
})
export class FinanceAccountPage implements OnInit {
  isLoading: boolean = false;
  LIST_OF_FINANCE: Array<IFinanceAccount>;
  params: IRequestParamsFinance = {
    sort_field: 'name',
    sort_type: '1',
  }
  constructor(
    private financeAccount: FinanceAccountService,
    private auth: AuthService,
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }
  async showModalHandler() {
    const modal = await this.modalCtrl.create({
      component: CreateFinanceAccountComponent
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.LoadFinanceAccount();
    });
  }
  async viewHandler(FINANCE: IFinanceAccount) {
    const modal = await this.modalCtrl.create({
      component: UpdateFinanceAccountComponent,
      componentProps: FINANCE
    });
    await modal.present();
  }
  async EditHandler(FINANCE: IFinanceAccount) {
    const modal = await this.modalCtrl.create({
      component: UpdateFinanceAccountComponent,
      componentProps: FINANCE
    });
    await modal.present();
  }
  async DeleteHandler(FINANCE: IFinanceAccount) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: status,
      subHeader: `Delete data ${FINANCE.name}`,
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.DeleteFinanceAccount(FINANCE.id)
          }
        }
      ]
    });
    await alert.present();
  }
  sortFieldHandler(params: string) {
    this.params.sort_field = params;
    this.LoadFinanceAccount();
  }
  async DeleteFinanceAccount(financeId: number) {
    this.present();
    const token: string = await this.auth.getToken();
    this.financeAccount.DeleteFinanceAccount(token, financeId).subscribe((response: any) => {
      this.LoadFinanceAccount();
      this.dismiss();
    }, (error) => {
      this.dismiss();
      if (error.status == 401) {
        this.presentAlert(error.status, error.statusText);
      } else {
        this.presentAlert(error.status, error.error.message);
      }
    }, () => {
      console.log("complete");
    })
  }
  async LoadFinanceAccount() {
    this.present();
    const token: string = await this.auth.getToken();
    this.financeAccount.GetListOfFinanceAccount(token, this.params).subscribe((response: any) => {
      this.LIST_OF_FINANCE = response.data;
      this.dismiss();
    }, (error) => {
      this.dismiss();
      if (error.status == 401) {
        this.presentAlert(error.status, error.statusText);
      } else {
        this.presentAlert(error.status, error.error.message);
      }
    }, () => {
      console.log("complete");
    })
  }
  ngOnInit() {
    this.LoadFinanceAccount();
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
  logoutHandler() {
    this.auth.signout();
  }
}
