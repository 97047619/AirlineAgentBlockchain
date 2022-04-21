import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-change-ticket-status-form',
  templateUrl: './change-ticket-status-form.component.html',
  styleUrls: ['./change-ticket-status-form.component.scss']
})
export class ChangeTicketStatusFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.changeAirlineTicketStatus(data.airlineTicketId, data.newStatus);
  }
}
