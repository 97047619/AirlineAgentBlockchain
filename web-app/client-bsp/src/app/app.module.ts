import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QueryAllTicketsComponent } from './query-all-tickets/query-all-tickets.component';
import { ApiService } from './api.service';
import { MintTokensFormComponent } from './submit-component/mint-tokens-form/mint-tokens-form.component';
import { BurnTokensFormComponent } from './submit-component/burn-tokens-form/burn-tokens-form.component';
import { GetClientBalanceFormComponent } from './submit-component/get-client-balance-form/get-client-balance-form.component';
import { TransferTokensFormComponent } from './submit-component/transfer-tokens-form/transfer-tokens-form.component';
import { TransferTokensFromFormComponent } from './submit-component/transfer-tokens-from-form/transfer-tokens-from-form.component';
import { DisplayBalanceComponent } from './display-balance/display-balance.component';
import { DisplayTotalSupplyComponent } from './display-total-supply/display-total-supply.component';
import { SubmitComponent } from './submit-component/submit.component';


@NgModule({
  declarations: [
    AppComponent,
    QueryAllTicketsComponent,
    MintTokensFormComponent,
    BurnTokensFormComponent,
    GetClientBalanceFormComponent,
    TransferTokensFormComponent,
    TransferTokensFromFormComponent,
    DisplayBalanceComponent,
    DisplayTotalSupplyComponent,
    SubmitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
