import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { FilterComponent } from '../filter/filter';
import { DashboardResponse } from '../app/models/dashboard-response';
import { TableOfRequestsComponent } from '../table-of-requests/table-of-requests';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-my-requests',
   standalone: true,
   imports: [CommonModule,FilterComponent, TableOfRequestsComponent],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
export class MyRequestsComponent implements OnInit {

requests: any[] = [];  

  dashboard  = {
    totalRequests: 0,
   pendingRequests: 0,
  approvedRequests: 0,
  rejectedRequests: 0
  };

  constructor(private requestsService: RequestsService) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadRequests();
  }

  loadDashboard() {
    /*
    this.requestsService.getDashboard().subscribe(res => {
      this.dashboard = res.data;
    });
    */
     this.requestsService.getDashboard()
    .subscribe({
      next: (res) => {

        console.log('Dashboard response:', JSON.stringify(res));
        this.dashboard = res.data;

      },
      error: (err) => {
        console.error('Dashboard error:', err);
      }
    });
  }

 /*
   loadRequests(filter?: any): void {

  this.requestsService.getMyRequests()
    .subscribe({
      next: (res) => {

        console.log('My Requests API Response:', res);

        this.requests = res;

      },
      error: (err) => {
        console.error('My Requests Error:', err);
      }
    });

}
    */
   loadRequests(filter?: any): void {

  console.log('Filter received:', filter);

  this.requestsService.getMyRequests(filter)
    .subscribe({
      next: (res) => {

        console.log('My Requests API Response:', res);

        this.requests = res.data ?? res;

      },
      error: (err) => {
        console.error('My Requests Error:', err);
      }
    });

}
}
