import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-display-balance',
  templateUrl: './display-balance.component.html',
  styleUrls: ['./display-balance.component.scss']
})
export class DisplayBalanceComponent implements OnInit {

  public balances: Array<object>;
  
  response;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.balances$.subscribe((balancesArray) => {
      this.balances = balancesArray;
    });
    this.apiService.getClientAccountBalance();
  }
}
