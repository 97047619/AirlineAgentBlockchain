import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-transfer-tokens-from-form',
  templateUrl: './transfer-tokens-from-form.component.html',
  styleUrls: ['./transfer-tokens-from-form.component.scss']
})
export class TransferTokensFromFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.transferTokensFrom(data.from, data.to, data.value);
  }
}
