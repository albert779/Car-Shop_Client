/*

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

  selectedRequestId: number | null = null;
  selectedStatusId: number = 1;
  managerMessage: string = '';
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public request: any,
    private dialogRef: MatDialogRef<RequestDetailsDialogComponent>,
    private requestsService: RequestsService
  ) {
    this.selectedStatusId = this.getStatusId(request);

    // Show the latest customer message from the Messages table
    this.managerMessage = request.lastMessage ?? '';
  }

  // ============================
  // GET CURRENT STATUS ID
  // ============================
  private getStatusId(request: any): number {

    if (
      request.statusId !== null &&
      request.statusId !== undefined
    ) {
      return Number(request.statusId);
    }

    if (
      request.requestStatusId !== null &&
      request.requestStatusId !== undefined
    ) {
      return Number(request.requestStatusId);
    }

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

    const messageText = this.managerMessage.trim();

    if (!messageText) {
      console.error('Message is empty');
      return;
    }

    // Get request ID
    const requestId = Number(
      this.request.id ?? this.request.requestId
    );

    if (!Number.isInteger(requestId) || requestId <= 0) {
      console.error(
        'Invalid requestId:',
        this.request.id,
        this.request.requestId
      );
      return;
    }

    // Only send requestId and messageText.
    // Backend gets senderId from JWT
    // and receiverId from VehicleRequest.UserId.
    const messageData = {
      requestId: requestId,
      messageText: messageText
    };

    console.log('Sending message:', messageData);

    this.requestsService.sendMessage(messageData)
      .subscribe({

        next: (response) => {

          console.log(
            'Message saved successfully:',
            response
          );

          const result = response as any;

          const lastUpdate =
            result?.data?.lastUpdate;

          this.dialogRef.close({
            requestId: requestId,
            statusId: this.selectedStatusId,
            messageText: messageText,
            lastUpdate: lastUpdate
          });
        },

        error: (error) => {

          console.error(
            'Message save failed:',
            error
          );

          console.error(
            'HTTP status:',
            error.status
          );

          console.error(
            'Backend error:',
            error.error
          );

          if (error.error?.errors) {
            console.error(
              'Validation errors:',
              JSON.stringify(
                error.error.errors,
                null,
                2
              )
            );
          }
        }
      });
  }

  // ============================
  // CLOSE
  // ============================
  close(): void {
    this.dialogRef.close();
  }
}
  */

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
import { SupportHistoryComponent } from '../support-history/support-history';
import { firstValueFrom } from 'rxjs';

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
    MatFormFieldModule,
    SupportHistoryComponent
  ],
  templateUrl: './request-details-dialog.html',
  styleUrls: ['./request-details-dialog.css']
})
export class RequestDetailsDialogComponent {

  selectedRequestId: number | null = null;
  selectedStatusId = 1;
  managerMessage = '';
  currentUserId: number = 0;
  saving = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public request: any,
    private dialogRef: MatDialogRef<RequestDetailsDialogComponent>,
    private requestsService: RequestsService
  ) {
    // Initialize the request ID for support history.
    const id = Number(
      this.request?.id ?? this.request?.requestId
    );

    this.selectedRequestId =
      Number.isInteger(id) && id > 0 ? id : null;

    this.selectedStatusId = this.getStatusId(this.request);

    // Display the existing latest message, if available.
    this.managerMessage = this.request?.lastMessage ?? '';
  }

  private getStatusId(request: any): number {
    if (request?.statusId != null) {
      return Number(request.statusId);
    }

    if (request?.requestStatusId != null) {
      return Number(request.requestStatusId);
    }

    if (request?.status) {
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

    return 1;
  }

  changeStatus(statusId: number): void {
    this.selectedStatusId = statusId;
  }

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


  /*
  async save(supportHistory: SupportHistoryComponent): Promise<void> {
    const messageText = this.managerMessage.trim();
const messageSent = await supportHistory.sendMessageAndWait();

if (!messageSent) {
  return;
}

    if (!messageText) {
      console.error('Message is empty');
      return;
    }

    const requestId = this.selectedRequestId;

    if (requestId === null) {
      console.error('Invalid request ID:', this.request);
      return;
    }

    const messageData = {
      requestId,
      messageText
    };

    console.log('Sending message:', messageData);

    

    this.requestsService.sendMessage(messageData).subscribe({
      next: (response) => {
        console.log('Message saved successfully:', response);

        const result = response as any;

        this.dialogRef.close({
          requestId,
          statusId: this.selectedStatusId,
          messageText,
          lastUpdate: result?.data?.lastUpdate
        });
      },
      error: (error) => {
        console.error('Message save failed:', error);
        console.error('HTTP status:', error.status);
        console.error('Backend error:', error.error);

        console.error(
          'Backend message:',
          error.error?.message
        );
        console.error(
          'Backend exception:',
          error.error?.error
        );

        if (error.error?.errors) {
          console.error(
            'Validation errors:',
            JSON.stringify(error.error.errors, null, 2)
          );
        }
      }
    });
  }
    */

 async save(
  supportHistory: SupportHistoryComponent
): Promise<void> {
  if (this.saving) {
    return;
  }

  const requestId = Number(
    this.request?.id ?? this.request?.requestId
  );

  if (!Number.isInteger(requestId) || requestId <= 0) {
    console.error('Invalid request ID:', requestId);
    return;
  }

  this.saving = true;

  try {
    // Step 1: Save the selected status.
   const statusResponse: any = await firstValueFrom(
  this.requestsService.updateRequest(requestId, {
    statusId: this.selectedStatusId,
    message: ''
  })
);

    console.log('Status updated successfully:', statusResponse);

    // Step 2: Send the Support History message if one was entered.
    const messageSent = await supportHistory.sendMessageAndWait();

    if (!messageSent) {
      console.error(
        'The status was saved, but sending the message failed.'
      );
      return;
    }

    // Step 3: Close after both operations succeed.
    this.dialogRef.close({
      updated: true,
      requestId,
      statusId: this.selectedStatusId,
      status: this.getStatusName(),
      lastUpdate: statusResponse?.data?.lastUpdate ?? null
    });
  } catch (error: any) {
    console.error('Failed to save changes:', error);
    console.error('HTTP status:', error?.status);
    console.error('Backend response:', error?.error);
  } finally {
    this.saving = false;
  }
}

close(): void {
  this.dialogRef.close();
}
}