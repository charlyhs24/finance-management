import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api-service/api.service';
import { AuthService } from './services/auth-service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FinanceService } from './services/finance-service/finance.service';
import { FinanceAccountService } from './services/finance-account/finance-account.service';
import { FormsModule } from '@angular/forms';
import { CreateFinanceAccountComponent } from './components/create-finance-account/create-finance-account.component';
import { CreateFinanceComponent } from './components/create-finance/create-finance.component';
import { UpdateFinanceAccountComponent } from './components/update-finance-account/update-finance-account.component';
import { EditFinanceComponent } from './components/edit-finance/edit-finance.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFinanceAccountComponent,
    CreateFinanceComponent,
    UpdateFinanceAccountComponent,
    EditFinanceComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    AuthService,
    FinanceService,
    FinanceAccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
