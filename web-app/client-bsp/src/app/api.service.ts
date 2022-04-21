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

const baseURL = `http://localhost:8081`;
const queryAllTicketsURL = `/getAllAirlineTickets`;
const mintTokensURL = `/mintTokens`;
const burnTokensURL = `/burnTokens`;
const getBalanceOfURL = `/getBalanceOf`;
const displayBalanceURL = `/getClientAccountBalance`;
const displayTotalSupplyURL = `/getTotalSupply`;
const transferTokensURL = `/transferTokens`;
const transferTokensFromURL = `/transferTokensFrom`;

@Injectable()
export class ApiService {

  public tickets$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public balances$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public supplies$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public clientBalances$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);

  constructor(private http: HttpClient) {
  }

  mintTokens(amount: string) {
    return this.http.post(baseURL + mintTokensURL, ({
      'amount': amount,
    }), { headers }).toPromise().then((result) => { this.getTotalSupply(); });
  }

  burnTokens(amount: string) {
    return this.http.post(baseURL + burnTokensURL, ({
      'amount': amount,
    }), { headers }).toPromise().then((result) => { this.getTotalSupply(); });
  }

  getBalanceOf(clientId: string) {
    return this.http.post(baseURL + getBalanceOfURL, ({
      'clientId': clientId,
    }), { headers }).toPromise().then((result) => { this.clientBalances$.next() });
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

  getTotalSupply() {
    return this.http.get<Array<any>>(baseURL + displayTotalSupplyURL, httpOptionsJson).subscribe((response) => {
      this.supplies$.next(response);
    });
  }

  transferTokens(to: string, value: string) {
    return this.http.post(baseURL + transferTokensURL, { 'to': to, 'value': value },
      { headers }).toPromise().then((result) => { this.getClientAccountBalance(); });
  }

  transferTokensFrom(from: string, to: string, value: string) {
    return this.http.post(baseURL + transferTokensFromURL, { 'from': from, 'to': to, 'value': value },
      { headers }).toPromise().then((result) => { this.getClientAccountBalance(); });
  }
}
