import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-burn-tokens-form',
  templateUrl: './burn-tokens-form.component.html',
  styleUrls: ['./burn-tokens-form.component.scss']
})
export class BurnTokensFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.burnTokens(data.amount);
  }

}
