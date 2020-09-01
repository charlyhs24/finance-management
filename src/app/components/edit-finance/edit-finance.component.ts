import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { FinanceService } from 'src/app/services/finance-service/finance.service';
import { FinanceAccountService } from 'src/app/services/finance-account/finance-account.service';

@Component({
  selector: 'app-edit-finance',
  templateUrl: './edit-finance.component.html',
  styleUrls: ['./edit-finance.component.scss'],
})
export class EditFinanceComponent implements OnInit {
  financeId: number = null;
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
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.LoadFinanceAccount();
    this.financeId = this.navParams.get("id");
    this.state = {
      finance_account_type_id: this.navParams.get("finance_account_type"),
      credit_amount: this.navParams.get("credit_amount"),
      amount: this.navParams.get("debit_amount"),
      debit_amout: this.navParams.get("debit_amount"),
      description: this.navParams.get("description"),
      finance_account_id: this.navParams.get("finance_account_id"),
      title: this.navParams.get("title"),
    }
    console.log("state");
    console.log(this.state)
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
  async onSubmitUpdateFinance() {
    this.present();
    const token: string = await this.auth.getToken();
    this.finance.UpdateFinance({
      finance_account_id: this.state.finance_account_id,
      title: this.state.title,
      amount: this.state.amount,
      description: this.state.description,
      debit_amout: this.state.amount,
      credit_amount: this.state.amount,
      finance_account_type_id: this.state.finance_account_type_id
    }, token, this.financeId)
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
