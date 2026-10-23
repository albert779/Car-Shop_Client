import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SupportMessage } from '../../models/support-message'; '../../models/support-message';

@Injectable({
  providedIn: 'root'
})
export class SupportHistoryService {
  private readonly apiUrl = '/api/support-history';

  constructor(private http: HttpClient) {}

  getMessages(requestId: number): Observable<SupportMessage> {
    return this.http.get< SupportMessage>(
      `${this.apiUrl}/requests/${requestId}/messages`
    );
  }

  sendMessage(
    requestId: number,
    messageText: string
  ): Observable<SupportMessage> {
    return this.http.post<SupportMessage>(
      `${this.apiUrl}/messages`,
      {
        requestId,
        messageText
      }
    );
  }
}