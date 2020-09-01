import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/services/finance-service/finance.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FinanceAccountService } from 'src/app/services/finance-account/finance-account.service';
@Component({
  selector: 'app-create-finance',
  templateUrl: './create-finance.component.html',
  styleUrls: ['./create-finance.component.scss'],
})
export class CreateFinanceComponent implements OnInit {
  isLoading: boolean = false;
  LIST_OF_FINANCE: Array<IFinanceAccount>;
  state: IReqFinance = {
    finance_account_type_id: null,
    credit_amount: null,
    amount: null,
    debit_amout: null,
    description: null,
    finance_account_id: null,
    title: null,
  }
  params: IRequestParamsFinance = {
    sort_field: 'name',
    sort_type: '1',
  }
  constructor(
    private finance: FinanceService,
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
  ngOnInit() {
    this.LoadFinanceAccount();
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
  async onSubmitNewFinance() {
    this.present();
    const token: string = await this.auth.getToken();
    this.finance.CreateFinance({
      finance_account_id: this.state.finance_account_id,
      title: this.state.title,
      amount: this.state.amount,
      description: this.state.description,
      debit_amout: this.state.amount,
      credit_amount: this.state.amount,
      finance_account_type_id: this.state.finance_account_type_id
    }, token)
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
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
