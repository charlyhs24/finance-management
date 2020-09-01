import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FinanceAccountService {
  constructor(private api: ApiService) { }
  GetListOfFinanceAccount(authorization: string, params: IRequestParamsFinance) {
    let parameters = new HttpParams().set('sort_field', params.sort_field).set('sort_type', params.sort_type);
    return this.api.get('https://development.paper.id:3500/test-case/api/v1/finance-accounts', authorization, parameters);
  }
  GetDetailFinanceAccount(authorization: string, financeId: string) {
    return this.api.get(`https://development.paper.id:3500/test-case/api/v1/finance-accounts/${financeId}`, authorization);
  }
  CreateFinanceAccount(body: IRequestFinanceAccount, authorization: string) {
    return this.api.post('https://development.paper.id:3500/test-case/api/v1/finance-accounts', authorization, body);
  }
  UpdateFinanceAccount(body: IRequestFinanceAccount, authorization: string, financeId: number) {
    return this.api.patch(`https://development.paper.id:3500/test-case/api/v1/finance-accounts/${financeId}`, authorization, body);
  }
  DeleteFinanceAccount(authorization: string, financeId: number) {
    return this.api.delete(`https://development.paper.id:3500/test-case/api/v1/finance-accounts/${financeId}`, authorization);
  }
}
