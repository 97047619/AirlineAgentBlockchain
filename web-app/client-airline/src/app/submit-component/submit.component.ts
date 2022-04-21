import { Component, OnInit } from '@angular/core';

import { CreateTicketFormComponent } from './create-ticket-form/create-ticket-form.component';
import { ChangeTicketOwnerFormComponent } from './change-ticket-owner-form/change-ticket-owner-form.component';
import { ChangeTicketStatusFormComponent } from './change-ticket-status-form/change-ticket-status-form.component';
import { DeleteTicketFormComponent } from './delete-ticket-form/delete-ticket-form.component';
import { TransferTokensFormComponent } from './transfer-tokens-form/transfer-tokens-form.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor() { }

  showCreateTicket = true;
  showChangeTicket = false;
  showManageTokens = false;

  ngOnInit() {
  }

  toggle(tabName) {
    if (tabName === 'create') {
      this.showCreateTicket = true;
      this.showChangeTicket = false;
      this.showManageTokens = false;
    }
    if (tabName === 'change') {
      this.showCreateTicket = false;
      this.showChangeTicket = true;
      this.showManageTokens = false;
    }
    if (tabName === 'tokens') {
      this.showCreateTicket = false;
      this.showChangeTicket = false;
      this.showManageTokens = true;
    }
  }
}
