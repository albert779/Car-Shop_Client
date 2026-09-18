import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RequestsService } from '../services/requests.service';
import { LocalStorageService } from '../services/local-storage';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-request-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './request-details-dialog.html',
  styleUrls: ['./request-details-dialog.css']
})
export class RequestDetailsDialogComponent {

  selectedStatusId: number=1;
  managerMessage: string = '';
constructor(
  @Inject(MAT_DIALOG_DATA) public request: any,
  private dialogRef: MatDialogRef<RequestDetailsDialogComponent>,
  private requestsService: RequestsService,
  private localStorageService: LocalStorageService
) {
  this.selectedStatusId = this.getStatusId(request);

  this.managerMessage =
    request.managerMessage ??
    request.message ??
    '';
}
  

  // ============================
  // GET CURRENT STATUS ID
  // ============================
  private getStatusId(request: any): number {

    // If statusId exists, use it
    if (request.statusId !== null && request.statusId !== undefined) {
      return Number(request.statusId);
    }

    // If backend sends RequestStatusId
    if (
      request.requestStatusId !== null &&
      request.requestStatusId !== undefined
    ) {
      return Number(request.requestStatusId);
    }

    // If backend sends status as text
    if (request.status) {

      switch (request.status.toString().toLowerCase()) {

        case 'pending':
          return 1;

        case 'approved':
        case 'approve':
          return 2;

        case 'rejected':
        case 'reject':
          return 3;

        default:
          return 1;
      }
    }

    // Default only if no status was supplied
    return 1;
  }

  // ============================
  // CHANGE STATUS
  // ============================
  changeStatus(statusId: number): void {

    this.selectedStatusId = statusId;

  }


  // ============================
  // GET STATUS NAME
  // ============================
  getStatusName(): string {

    switch (this.selectedStatusId) {

      case 1:
        return 'Pending';

      case 2:
        return 'Approved';

      case 3:
        return 'Rejected';

      default:
        return 'Unknown';
    }
  }


  // ============================
  // SAVE
  // ============================
 save(): void {

  // 1. Check message
  const messageText = this.managerMessage.trim();

  if (!messageText) {
    console.error('Message is empty');
    return;
  }

  // 2. Get JWT token
  const token =
    this.localStorageService.getValueFromStore<string>('token');

  if (!token) {
    console.error('No logged-in user token found');
    return;
  }

  // 3. Decode JWT
  let decodedToken: any;

  try {
    decodedToken = jwtDecode<any>(token);
  } catch (error) {
    console.error('Could not decode token:', error);
    return;
  }

  console.log('DECODED JWT:', decodedToken);

  // 4. Get sender ID from JWT
  const rawSenderId =
    decodedToken.id ??
    decodedToken.sub ??
    decodedToken[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  const senderId = Number(rawSenderId);

  // 5. Get receiver ID from request
  const receiverId = Number(this.request.userId);

  console.log('Request:', this.request);
  console.log('Raw Sender ID:', rawSenderId);
  console.log('Sender ID:', senderId);
  console.log('Receiver ID:', receiverId);

  // 6. Validate sender
  if (!Number.isInteger(senderId) || senderId <= 0) {
    console.error('Invalid senderId:', rawSenderId);
    return;
  }

  // 7. Validate receiver
  if (!Number.isInteger(receiverId) || receiverId <= 0) {
    console.error('Invalid receiverId:', this.request.userId);
    return;
  }

  // 8. Validate request ID
  const requestId = Number(this.request.id);

  if (!Number.isInteger(requestId) || requestId <= 0) {
    console.error('Invalid requestId:', this.request.id);
    return;
  }

  // 9. Create request body
  const messageData = {
    requestId: requestId,
    senderId: senderId,
    receiverId: receiverId,
    messageText: messageText
  };

  // 10. Show EXACT JSON being sent
  console.log('FINAL MESSAGE DATA:', messageData);
  console.log(
    'FINAL JSON:',
    JSON.stringify(messageData)
  );

  // 11. Send to backend
  this.requestsService.sendMessage(messageData)
    .subscribe({

      next: (response) => {

        console.log('Message saved successfully:', response);
        
       const result = response as any;
       const lastUpdate = result?.data?.lastUpdate;  

        this.dialogRef.close({
          requestId: requestId,
          statusId: this.selectedStatusId,
          messageText: messageText,
           lastUpdate: lastUpdate
        });
      },

      error: (error) => {

        console.error('Message save failed:', error);
        console.error('HTTP status:', error.status);
        console.error('Backend error:', error.error);

        if (error.error?.errors) {
          console.error(
            'Validation errors:',
            JSON.stringify(error.error.errors, null, 2)
          );
        }
      }
    });
}
close(): void {
    this.dialogRef.close();
  }
}
