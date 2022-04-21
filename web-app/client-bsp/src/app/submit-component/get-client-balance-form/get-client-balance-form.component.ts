import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-get-client-balance-form',
  templateUrl: './get-client-balance-form.component.html',
  styleUrls: ['./get-client-balance-form.component.scss']
})
export class GetClientBalanceFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.getBalanceOf(data.clientId);
  }
}
