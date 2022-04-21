import { Component, OnInit } from '@angular/core';

import { MintTokensFormComponent } from './mint-tokens-form/mint-tokens-form.component';
import { BurnTokensFormComponent } from './burn-tokens-form/burn-tokens-form.component';
import { GetClientBalanceFormComponent } from './get-client-balance-form/get-client-balance-form.component';
import { TransferTokensFormComponent } from './transfer-tokens-form/transfer-tokens-form.component';
import { TransferTokensFromFormComponent } from './transfer-tokens-from-form/transfer-tokens-from-form.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor() { }

  showMintTokens = false;
  
  ngOnInit() {
  }

  toggle(tabName) {
    if (tabName === 'change') {
      this.showMintTokens = false;
    }
    if (tabName === 'mint') {
      this.showMintTokens = true;
    }  
  }
}
