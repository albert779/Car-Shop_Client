import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { RequestDashboard } from '../app/models/request-dashboard.model';

import { Observable } from 'rxjs';
//import { ApiResponse } from '../app/auth/auth';
import { DashboardResponse } from '../app/models/dashboard-response';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

 //TableOfRequests: any;

  constructor(private http: HttpClient) {}

  getMyRequests(filter?: any) {


let params: any = {
    page: filter?.page ?? 1,
    pageSize: filter?.pageSize ?? 10
  };

  if (filter?.search?.trim()) {
    params.search = filter.search.trim();
  }

  if (filter?.statusId != null) {
    params.statusId = filter.statusId;
  }

  if (filter?.fromDate) {
    params.fromDate = filter.fromDate;
  }

  if (filter?.toDate) {
    params.toDate = filter.toDate;
  }


  console.log('Sending params:', params);


    return this.http.get<any>(
      `TableOfRequests`,
      {
      params: params
      }

    );

  }


  getDashboard(): Observable<DashboardResponse> {
  return this.http.get<DashboardResponse>(
    `dashboard`
  );
}
  

/*
getDashboard(): Observable<DashboardResponse> {

    return this.http
      .get<any>(`${this.apiUrl}/dashboard`)
      .pipe(
        map((response: { data: any; }) => response.data)
      );

  }
*/

    
  }
