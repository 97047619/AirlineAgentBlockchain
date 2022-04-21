import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
    'Accept': 'text/plain'
  }),
};

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

const baseURL = `http://localhost:8082`;
const queryAllTicketsURL = `/getAllAirlineTickets`;
const changeTicketOwnerURL = `/transferAirlineTicket`;
const changeTicketStatusURL = `/changeAirlineTicketStatus`;
const displayBalanceURL = `/getClientAccountBalance`;
const transferTokensURL = `/transferTokens`;

@Injectable()
export class ApiService {

  public tickets$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public balances$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);

  constructor(private http: HttpClient) {
  }

  transferAirlineTicket(key: string, newOwner: string) {
    return this.http.post(baseURL + changeTicketOwnerURL, { 'airlineTicketId': key, 'newOwner': newOwner },
      { headers }).toPromise().then((result) => { this.getAllAirlineTickets(); });
  }

  changeAirlineTicketStatus(key: string, newStatus: string) {
    return this.http.post(baseURL + changeTicketStatusURL, { 'airlineTicketId': key, 'newStatus': newStatus },
      { headers }).toPromise().then((result) => { this.getAllAirlineTickets(); });
  }

  getAllAirlineTickets() {
    return this.http.get<Array<any>>(baseURL + queryAllTicketsURL, httpOptionsJson).subscribe((response) => {
      this.tickets$.next(response);
    });
  }

  getClientAccountBalance() {
    return this.http.get<Array<any>>(baseURL + displayBalanceURL, httpOptionsJson).subscribe((response) => {
      this.balances$.next(response);
    });
  }

  transferTokens(to: string, value: string) {
    return this.http.post(baseURL + transferTokensURL, { 'to': to, 'value': value },
      { headers }).toPromise().then((result) => { this.getClientAccountBalance(); });
  }
}
