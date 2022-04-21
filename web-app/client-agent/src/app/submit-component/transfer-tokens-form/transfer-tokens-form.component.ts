import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-transfer-tokens-form',
  templateUrl: './transfer-tokens-form.component.html',
  styleUrls: ['./transfer-tokens-form.component.scss']
})
export class TransferTokensFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.transferTokens(data.to, data.value);
  }
}
