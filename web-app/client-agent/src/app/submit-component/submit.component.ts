import { Component, OnInit } from '@angular/core';

import { ChangeTicketOwnerFormComponent } from './change-ticket-owner-form/change-ticket-owner-form.component';
import { ChangeTicketStatusFormComponent } from './change-ticket-status-form/change-ticket-status-form.component';
import { TransferTokensFormComponent } from './transfer-tokens-form/transfer-tokens-form.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor() { }

  showPurchaseTicket = true;
  
  ngOnInit() {
  }

  toggle(tabName) {
    if (tabName === 'manage') {
      this.showPurchaseTicket = false;
    }
    if (tabName === 'purchase') {
      this.showPurchaseTicket = true;
    }
  }
}
