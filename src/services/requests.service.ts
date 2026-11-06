import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponseBase } from '../_shared/interfaces/api.response.base';
import { DashboardResponse } from '../app/models/dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Filtered and paginated requests for the logged-in user
  getMyRequests(
    page: number = 1,
    pageSize: number = 5,
    filter?: any
  ): Observable<any> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    // Search
    const search = filter?.search?.trim() ?? '';
    params = params.set('search', search);

    // Status filter
    if (filter?.statusId != null) {
      params = params.set('statusId', filter.statusId.toString());
    }

    // From date
    if (filter?.fromDate) {
      params = params.set(
        'fromDate',
        this.formatDate(filter.fromDate)
      );
    }

    // To date
    if (filter?.toDate) {
      params = params.set(
        'toDate',
        this.formatDate(filter.toDate)
      );
    }

    console.log('REQUEST FILTER:', filter);
    console.log('REQUEST URL PARAMETERS:', params.toString());

    // Uses RequestFilterController
    return this.http.get<any>(
      'RequestFilter',
      { params }
    );
  }

  // Dashboard statistics
  getDashboard(): Observable<APIResponseBase<DashboardResponse>> {
    return this.http.get<APIResponseBase<DashboardResponse>>('dashboard');
  }

  // Update request
  updateRequest(
    requestId: number,
    data: {
      statusId: number;
      message: string;
    }
  ): Observable<any> {
    return this.http.put(
      `TableOfRequests/${requestId}`,
      data
    );
  }

  // Send support message
  sendMessage(data: {
    requestId: number;
    messageText: string;
  }): Observable<any> {
    return this.http.post(
      'TableOfRequests/message',
      data
    );
  }
}
