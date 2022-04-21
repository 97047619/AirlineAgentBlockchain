import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-query-all-tickets',
  templateUrl: './query-all-tickets.component.html',
  styleUrls: ['./query-all-tickets.component.scss']
})
export class QueryAllTicketsComponent implements OnInit {

  public tickets: Array<object>;
  response;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.tickets$.subscribe((ticketsArray) => {
      this.tickets = ticketsArray;
    });
    this.apiService.getAllAirlineTickets();
  }
}
