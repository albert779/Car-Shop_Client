import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SupportMessage,
  CreateSupportMessage
} from '../app/models/support-message';

@Injectable({
  providedIn: 'root'
})
export class SupportMessagesService {
  constructor(private http: HttpClient) {}

  getMessages(requestId: number): Observable<any> {
    return this.http.get<any>(
      `support-messages/requests/${requestId}`
    );
  }

  sendMessage(
    message: CreateSupportMessage
  ): Observable<any> {
    return this.http.post<any>(
      'support-messages',
      message
    );
  }
}