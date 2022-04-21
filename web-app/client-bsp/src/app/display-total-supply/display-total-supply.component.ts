import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-display-total-supply',
  templateUrl: './display-total-supply.component.html',
  styleUrls: ['./display-total-supply.component.scss']
})
export class DisplayTotalSupplyComponent implements OnInit {

  public supplies: Array<object>;
  
  response;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.supplies$.subscribe((suppliesArray) => {
      this.supplies = suppliesArray;
    });
    this.apiService.getTotalSupply();
  }
}
