import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  isLoading: boolean = false;
  constructor(
    private api: ApiService,
    private loadingCtrl: LoadingController,
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
  GetListOfFinance(authorization: string, params: IRequestParamsFinance) {
    let parameters = new HttpParams().set('sort_field', params.sort_field).set('sort_type', params.sort_type);
    return this.api.get('https://development.paper.id:3500/test-case/api/v1/finances', authorization, parameters);
  }
  GetDetailFinance(authorization: string, financeId: string) {
    return this.api.get(`https://development.paper.id:3500/test-case/api/v1/finances/${financeId}`, authorization);
  }
  CreateFinance(body: IReqFinance, authorization: string) {
    return this.api.post('https://development.paper.id:3500/test-case/api/v1/finances', authorization, body);
  }
  UpdateFinance(body: IReqFinance, authorization: string, financeId: number) {
    return this.api.patch(`https://development.paper.id:3500/test-case/api/v1/finances/${financeId}`, authorization, body);
  }
  DeleteFinance(authorization: string, financeId: number) {
    return this.api.delete(`https://development.paper.id:3500/test-case/api/v1/finances/${financeId}`, authorization);
  }
}
