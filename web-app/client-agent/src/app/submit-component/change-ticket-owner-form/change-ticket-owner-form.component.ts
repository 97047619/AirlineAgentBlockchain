import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-change-ticket-owner-form',
  templateUrl: './change-ticket-owner-form.component.html',
  styleUrls: ['./change-ticket-owner-form.component.scss']
})
export class ChangeTicketOwnerFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.transferAirlineTicket(data.airlineTicketId, "x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=agent1ca-ca");
  }
}
