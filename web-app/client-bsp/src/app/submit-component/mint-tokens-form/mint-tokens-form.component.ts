import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-mint-tokens-form',
  templateUrl: './mint-tokens-form.component.html',
  styleUrls: ['./mint-tokens-form.component.scss']
})
export class MintTokensFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.mintTokens(data.amount);
  }

}
