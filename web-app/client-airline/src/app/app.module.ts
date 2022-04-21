import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QueryAllTicketsComponent } from './query-all-tickets/query-all-tickets.component';
import { ApiService } from './api.service';
import { CreateTicketFormComponent } from './submit-component/create-ticket-form/create-ticket-form.component';
import { DeleteTicketFormComponent } from './submit-component/delete-ticket-form/delete-ticket-form.component';
import { ChangeTicketOwnerFormComponent } from './submit-component/change-ticket-owner-form/change-ticket-owner-form.component';
import { ChangeTicketStatusFormComponent } from './submit-component/change-ticket-status-form/change-ticket-status-form.component';
import { TransferTokensFormComponent } from './submit-component/transfer-tokens-form/transfer-tokens-form.component';
import { SubmitComponent } from './submit-component/submit.component';
import { DisplayBalanceComponent } from './display-balance/display-balance.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryAllTicketsComponent,
    CreateTicketFormComponent,
    DeleteTicketFormComponent,
    ChangeTicketOwnerFormComponent,
    ChangeTicketStatusFormComponent,
    TransferTokensFormComponent,
    SubmitComponent,
    DisplayBalanceComponent
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
