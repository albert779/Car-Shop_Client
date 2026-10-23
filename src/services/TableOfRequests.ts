
/*
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
providedIn:'root'
})

export class RequestsService{


api="https://localhost:5001/api/requests";


constructor(private http:HttpClient){}



getRequests()
{

return this.http.get<any[]>(this.api);

}


}
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TableOfRequest {
  id: number;
  userId: number;
  vehicle: string;
  image: string;
  message: string;
  status: string;
  requestedOn: string;
  lastUpdate: string | null;
  lastMessage: string | null;
}

export interface MyRequestsPage {
  items: TableOfRequest[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  // Use the URL and port configured for your running ASP.NET Core API.
  private api = 'http://localhost:5104/api/Dashboard';

  constructor(private http: HttpClient) {}

  // Get one page of the logged-in user's requests.
  getMyRequests(
    page: number = 1,
    pageSize: number = 5
  ): Observable<ApiResponse<MyRequestsPage>> {

    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<ApiResponse<MyRequestsPage>>(
      `${this.api}/my-requests`,
      { params }
    );
  }

  // Keep this method if other components use it.
  getRequests(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:5104/api/requests'
    );
  }
}