
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsService } from '../services/requests.service';
import { FilterComponent } from '../filter/filter';
import { TableOfRequestsComponent } from '../table-of-requests/table-of-requests';
import { SupportHistoryComponent } from '../support-history/support-history';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    TableOfRequestsComponent,
    //SupportHistoryComponent
  ],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
export class MyRequestsComponent implements OnInit {

  requests: any[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalCount = 0;
  totalPages = 0;
  loading = false;

  // Filters
  currentFilter: any = {
    search: '',
    statusId: null,
    fromDate: null,
    toDate: null
  };

  // Dashboard statistics
  dashboard = {
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  };

  constructor(private requestsService: RequestsService) {}

  ngOnInit(): void {
    this.refreshData();
   
  }

  refreshData(): void {
    this.loadDashboard();
    this.loadRequests();
  }

  
  loadDashboard(): void {
    this.requestsService.getDashboard().subscribe({
      next: (res: any) => {
        console.log('Dashboard response:', res);
        this.dashboard = res?.data ?? res;
      },
      error: (err) => {
        console.error('Dashboard error:', err);
      }
    });
  }
    

  

loadRequests(): void {
  this.loading = true;

  console.log('Loading requests:', {
    page: this.currentPage,
    pageSize: this.pageSize,
    filter: this.currentFilter
  });

  this.requestsService
    .getMyRequests(
      this.currentPage,
      this.pageSize,
      this.currentFilter
    )
    .subscribe({
      next: (res: any) => {
        console.log('My Requests API Response:', res);

        const result = res?.data ?? res;

        // Supports common paginated response property names.
        const items = Array.isArray(result)
          ? result
          : result?.items ?? result?.requests ?? [];

        this.requests = Array.isArray(items) ? items : [];

        this.currentPage = result?.page ?? this.currentPage;
        this.pageSize = result?.pageSize ?? this.pageSize;
        this.totalCount = result?.totalCount ?? 0;
        this.totalPages =
          result?.totalPages ??
          Math.ceil(this.totalCount / this.pageSize);

        this.loading = false;
      },
      error: (err) => {
        console.error('My Requests Error:', err);
        this.requests = [];
        this.totalCount = 0;
        this.totalPages = 0;
        this.loading = false;
      }
    });
}


  // Call this when the filter component emits its selected filters.
  onFilterChanged(filter: any): void {
    this.currentFilter = {
      search: filter?.search ?? '',
      statusId: filter?.statusId ?? null,
      fromDate: filter?.fromDate ?? null,
      toDate: filter?.toDate ?? null
    };

    this.currentPage = 1;
    this.loadRequests();
  }

  previousPage(): void {
    if (this.currentPage > 1 && !this.loading) {
      this.currentPage--;
      this.loadRequests();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.currentPage++;
      this.loadRequests();
    }
  }

  changePageSize(size: string): void {
    const parsedSize = Number(size);

    if (!Number.isFinite(parsedSize) || parsedSize < 1) {
      return;
    }

    this.pageSize = parsedSize;
    this.currentPage = 1;
    this.loadRequests();
  }

  onRequestUpdated(): void {
    console.log('Request updated - refreshing data');
    this.refreshData();
  }
}
  */


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsService } from '../services/requests.service';
import { FilterComponent } from '../filter/filter';
import { TableOfRequestsComponent } from '../table-of-requests/table-of-requests';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    TableOfRequestsComponent
  ],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
export class MyRequestsComponent implements OnInit {

  requests: any[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalCount = 0;
  totalPages = 0;
  loading = false;

  // Current filters
  currentFilter: any = {
    search: '',
    statusId: null,
    fromDate: null,
    toDate: null
  };

  // Dashboard statistics
  dashboard = {
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  };

  constructor(private requestsService: RequestsService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.loadDashboard();
    this.currentPage = 1;
    this.loadRequests();
  }

  loadDashboard(): void {
    this.requestsService.getDashboard().subscribe({
      next: (res: any) => {
        console.log('Dashboard response:', res);
        this.dashboard = res?.data ?? res;
      },
      error: (err) => {
        console.error('Dashboard error:', err);
      }
    });
  }

  loadRequests(): void {
    this.loading = true;

    const params = {
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.currentFilter.search?.trim() ?? '',
      statusId: this.currentFilter.statusId,
      fromDate: this.currentFilter.fromDate,
      toDate: this.currentFilter.toDate
    };

    console.log('Loading requests with:', params);

    this.requestsService
      .getMyRequests(
        this.currentPage,
        this.pageSize,
        this.currentFilter
      )
      .subscribe({
        next: (res: any) => {
          console.log('My Requests API Response:', res);

          const result = res?.data ?? res;

          this.requests = Array.isArray(result?.items)
            ? result.items
            : [];

          this.totalCount = result?.totalCount ?? 0;
          this.currentPage = result?.page ?? this.currentPage;
          this.pageSize = result?.pageSize ?? this.pageSize;

          this.totalPages = result?.totalPages ??
            Math.ceil(this.totalCount / this.pageSize);

          console.log('Filtered requests:', this.requests);
          console.log('Total count:', this.totalCount);

          this.loading = false;
        },
        error: (err) => {
          console.error('My Requests Error:', err);

          this.requests = [];
          this.totalCount = 0;
          this.totalPages = 0;

          this.loading = false;
        }
      });
  }

  onFilterChanged(filter: any): void {
    console.log('New filter received:', filter);

    this.currentFilter = {
      search: filter?.search?.trim() ?? '',
      statusId: filter?.statusId ?? null,
      fromDate: filter?.fromDate ?? null,
      toDate: filter?.toDate ?? null
    };

    // Always restart at page 1 when filters change.
    this.currentPage = 1;

    this.loadRequests();
  }

  previousPage(): void {
    if (this.currentPage > 1 && !this.loading) {
      this.currentPage--;
      this.loadRequests();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.currentPage++;
      this.loadRequests();
    }
  }

  changePageSize(size: string): void {
    const parsedSize = Number(size);

    if (!Number.isFinite(parsedSize) || parsedSize < 1) {
      return;
    }

    this.pageSize = parsedSize;
    this.currentPage = 1;
    this.loadRequests();
  }

  onRequestUpdated(): void {
    console.log('Request updated - refreshing data');
    this.refreshData();
  }
}
