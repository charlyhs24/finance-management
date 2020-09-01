import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FinanceService } from 'src/app/services/finance-service/finance.service';
import { CreateFinanceComponent } from 'src/app/components/create-finance/create-finance.component';
import { EditFinanceComponent } from 'src/app/components/edit-finance/edit-finance.component';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  isLoading: boolean = false;
  LIST_OF_FINANCE: Array<IFinance>;
  params: IRequestParamsFinance = {
    sort_field: 'title',
    sort_type: '1',
  }
  constructor(
    public modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private auth: AuthService,
    private finance: FinanceService,
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
  sortFieldHandler(params: string) {
    this.params.sort_field = params;
    this.LoadDataFinance();
  }
  async viewHandler(FINANCE: IFinance) {
    const modal = await this.modalCtrl.create({
      component: EditFinanceComponent,
      componentProps: FINANCE
    });
    await modal.present();
  }
  async EditHandler(FINANCE: IFinance) {
    const modal = await this.modalCtrl.create({
      component: EditFinanceComponent,
      componentProps: FINANCE
    });
    await modal.present();
  }
  async DeleteHandler(FINANCE: IFinance) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: status,
      subHeader: `Delete data ${FINANCE.title}`,
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
            this.DeleteFinance(FINANCE.id)
          }
        }
      ]
    });
    await alert.present();
  }
  async DeleteFinance(financeId: number) {
    this.present();
    const token: string = await this.auth.getToken();
    this.finance.DeleteFinance(token, financeId).subscribe((response: any) => {
      this.LoadDataFinance();
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
  async LoadDataFinance() {
    this.present();
    const token: string = await this.auth.getToken();
    this.finance.GetListOfFinance(token, this.params).subscribe((response: any) => {
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
  async showModalHandler() {
    const modal = await this.modalCtrl.create({
      component: CreateFinanceComponent
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.LoadDataFinance();
    });
  }
  ngOnInit() {
    this.menuCtrl.enable(true);
    this.LoadDataFinance();
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
