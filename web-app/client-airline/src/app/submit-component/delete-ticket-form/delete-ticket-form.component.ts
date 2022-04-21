import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-delete-ticket-form',
  templateUrl: './delete-ticket-form.component.html',
  styleUrls: ['./delete-ticket-form.component.scss']
})
export class DeleteTicketFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.deleteAirlineTicket(data.airlineTicketId);
  }

}
