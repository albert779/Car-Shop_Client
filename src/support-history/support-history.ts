/*
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupportMessagesService } from '../services/support-history.service';
import { SupportMessage } from '../app/models/support-message';

@Component({
  selector: 'app-support-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-history.html',
  styleUrls: ['./support-history.css']
})
export class SupportHistoryComponent implements OnChanges {
  @Input({ required: true }) requestId!: number;
  @Input({ required: true }) currentUserId!: number;

  messages: SupportMessage[] = [];
  messageText = '';
  loading = false;
  sending = false;
  errorMessage = '';

  constructor(
    private messagesService: SupportMessagesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['requestId'] || changes['currentUserId']) &&
      this.requestId > 0
    ) {
      this.loadMessages();
    }
  }

  loadMessages(): void {
    this.loading = true;
    this.errorMessage = '';

    this.messagesService.getMessages(this.requestId).subscribe({
      next: (response: any) => {
        const data = response?.data ?? response;
        this.messages = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load message history:', error);
        this.errorMessage = 'Could not load message history.';
        this.loading = false;
      }
    });
  }

  sendMessage(): void {
    const text = this.messageText.trim();

    if (!text || this.sending) {
      return;
    }

    this.sending = true;
    this.errorMessage = '';

    this.messagesService.sendMessage({
      requestId: this.requestId,
      messageText: text
    }).subscribe({
      next: () => {
        this.messageText = '';
        this.loadMessages();
        this.sending = false;
      },
      error: (error) => {
        console.error('Failed to send message:', error);
        this.errorMessage = 'Could not send the message.';
        this.sending = false;
      }
    });
  }
}
  */

/*
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SupportMessagesService } from '../services/support-history.service';
import { SupportMessage } from '../app/models/support-message';

@Component({
  selector: 'app-support-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-history.html',
  styleUrls: ['./support-history.css']
})
export class SupportHistoryComponent implements OnChanges {
  @Input({ required: true }) requestId!: number;
  @Input({ required: true }) currentUserId!: number;

  messages: SupportMessage[] = [];
  messageText = '';
  loading = false;
  sending = false;
  errorMessage = '';

  
getSenderId(message: any): number {
  return Number(
    message?.senderId ??
    message?.SenderId ??
    message?.createdByUserId ??
    message?.CreatedByUserId ??
    0
  );
}

getMessageText(message: any): string {
  return message?.messageText ?? message?.MessageText ?? '';
}

getCreatedAt(message: any): string | Date | null {
  return message?.createdAt ?? message?.CreatedAt ?? null;
}


  constructor(
    private messagesService: SupportMessagesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['requestId'] || changes['currentUserId']) &&
      Number(this.requestId) > 0
    ) {
      this.loadMessages();
    }
  }

  loadMessages(): void {
    if (!Number(this.requestId) || this.requestId <= 0) {
      this.messages = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.messagesService.getMessages(this.requestId).subscribe({
      next: (response: any) => {
        console.log('Support history API response:', response);

        const data = response?.data ?? response;

        let rows: any[] = [];

        if (Array.isArray(data)) {
          rows = data;
        } else if (Array.isArray(data?.messages)) {
          rows = data.messages;
        } else if (Array.isArray(data?.items)) {
          rows = data.items;
        } else if (Array.isArray(data?.results)) {
          rows = data.results;
        }

        this.messages = rows;

        console.log('Messages loaded:', this.messages);
        console.log('Request ID:', this.requestId);

        if (rows.length === 0) {
          console.warn(
            'No messages array found for this request. Check the API response structure.'
          );
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load message history:', error);
        this.errorMessage = 'Could not load message history.';
        this.messages = [];
        this.loading = false;
      }
    });
  }

  sendMessage(): void {
    const text = this.messageText.trim();

    if (
      !text ||
      this.sending ||
      !Number(this.requestId) ||
      this.requestId <= 0
    ) {
      return;
    }

    this.sending = true;
    this.errorMessage = '';

    this.messagesService.sendMessage({
      requestId: this.requestId,
      messageText: text
    }).subscribe({
      next: (response: any) => {
        console.log('Send message response:', response);

        this.messageText = '';
        this.sending = false;

        // Reload persisted messages from the server.
        this.loadMessages();
      },
      error: (error) => {
        console.error('Failed to send message:', error);
        this.errorMessage = 'Could not send the message.';
        this.sending = false;
      }
    });
  }
}
*/


import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SupportMessagesService } from '../services/support-history.service';
import { SupportMessage } from '../app/models/support-message';

@Component({
  selector: 'app-support-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-history.html',
  styleUrls: ['./support-history.css']
})
export class SupportHistoryComponent implements OnChanges {
  @Input({ required: true }) requestId!: number;
  @Input({ required: true }) currentUserId!: number;

  messages: SupportMessage[] = [];
  messageText = '';
  loading = false;
  sending = false;
  errorMessage = '';

  constructor(
    private messagesService: SupportMessagesService
  ) {}

  // Get the sender ID, supporting different API property names.
  getSenderId(message: any): number {
    return Number(
      message?.senderId ??
      message?.SenderId ??
      message?.createdByUserId ??
      message?.CreatedByUserId ??
      0
    );
  }

  // Get the message text.
  getMessageText(message: any): string {
    return message?.messageText ?? message?.MessageText ?? '';
  }

  // Get the message creation date.
  getCreatedAt(message: any): string | Date | null {
    return message?.createdAt ?? message?.CreatedAt ?? null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['requestId'] || changes['currentUserId']) &&
      Number(this.requestId) > 0
    ) {
      this.loadMessages();
    }
  }

  loadMessages(): void {
    if (!Number(this.requestId) || this.requestId <= 0) {
      this.messages = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.messagesService.getMessages(this.requestId).subscribe({
      next: (response: any) => {
        console.log('Support history API response:', response);

        const data = response?.data ?? response;

        let rows: any[] = [];

        if (Array.isArray(data)) {
          rows = data;
        } else if (Array.isArray(data?.messages)) {
          rows = data.messages;
        } else if (Array.isArray(data?.items)) {
          rows = data.items;
        } else if (Array.isArray(data?.results)) {
          rows = data.results;
        }

        this.messages = rows;

        console.log('Messages loaded:', this.messages);
        console.log('Request ID:', this.requestId);

        if (rows.length === 0) {
          console.warn(
            'No messages found. Check the API response structure.'
          );
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load message history:', error);
        this.errorMessage = 'Could not load message history.';
        this.messages = [];
        this.loading = false;
      }
    });
  }

  sendMessage(): void {
    const text = this.messageText.trim();

    if (
      !text ||
      this.sending ||
      !Number(this.requestId) ||
      this.requestId <= 0
    ) {
      return;
    }

    this.sending = true;
    this.errorMessage = '';

    this.messagesService.sendMessage({
      requestId: this.requestId,
      messageText: text
    }).subscribe({
      next: (response: any) => {
        console.log('Send message response:', response);

        this.messageText = '';
        this.sending = false;

        // Reload messages saved in the database.
        this.loadMessages();
      },
      error: (error) => {
        console.error('Failed to send message:', error);
        this.errorMessage = 'Could not send the message.';
        this.sending = false;
      }
    });
  }


    // Called by Save Changes in the parent dialog.
  sendMessageAndWait(): Promise<boolean> {
    const text = this.messageText.trim();

    // No message entered: nothing to send, so continue saving the status.
    if (!text) {
      return Promise.resolve(true);
    }

    if (this.sending || !Number(this.requestId) || this.requestId <= 0) {
      return Promise.resolve(false);
    }

    this.sending = true;
    this.errorMessage = '';

    return new Promise<boolean>((resolve) => {
      this.messagesService.sendMessage({
        requestId: this.requestId,
        messageText: text
      }).subscribe({
        next: () => {
          this.messageText = '';
          this.sending = false;
          this.loadMessages();
          resolve(true);
        },
        error: (error) => {
          console.error('Failed to send message:', error);
          this.errorMessage = 'Could not send the message.';
          this.sending = false;
          resolve(false);
        }
      });
    });
  }
}
