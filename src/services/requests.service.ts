
import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../app/models/dashboard-response';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  apiUrl: any;

  
 //TableOfRequests: any;

  constructor(private http: HttpClient) {}

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getMyRequests(filter?: any) {


 let params = new HttpParams()
     // .set('page', filter?.page ?? 1)
     // .set('pageSize', filter?.pageSize ?? 10);

  if (filter?.search?.trim()) {
    params = params.set('search', filter.search.trim());
  }

  if (filter?.statusId != null) {
    params = params.set('statusId', filter.statusId.toString());
  }

  if (filter?.fromDate instanceof Date) {
    params = params.set(
      'fromDate',
      this.formatDate(filter.fromDate)
    );
  }

  if (filter?.toDate instanceof Date) {
    params = params.set(
      'toDate',
      this.formatDate(filter.toDate)
    );
  }


  console.log('Sending params:', params);
   console.log('FILTER:', filter);
  console.log('PARAMS:', params.toString());


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

sendMessage(data: {
  requestId: number;
  senderId: number;
  receiverId: number;
  messageText: string;
}) {
  return this.http.post(
     'TableOfRequests/message',
    data
  );
}
    
  }

