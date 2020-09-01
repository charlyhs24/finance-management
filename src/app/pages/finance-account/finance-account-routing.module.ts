import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceAccountPage } from './finance-account.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceAccountPageRoutingModule {}
