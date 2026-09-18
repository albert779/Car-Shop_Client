import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RequestDetailsDialogComponent } from '../request-details-dialog/request-details-dialog';
import { RequestsService } from '../services/requests.service';



@Component({
  selector: 'app-table-of-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './table-of-requests.html',
  styleUrls: ['./table-of-requests.css']
})
export class TableOfRequestsComponent {


  @Input() requests:any[] = [];


  displayedColumns = [
    'id',
    'vehicle',
    'message',
    'status',
    'requestedOn',
    'lastUpdate',
    'actions'
  ];


  view(request:any){
    console.log(request);
  }

constructor(
    private dialog: MatDialog,
    private requestsService: RequestsService
  ) {}

  openView(request: any): void {
   console.log('VIEW REQUEST:', request);
   console.log('REQUEST BEFORE DIALOG:', request);
  console.log('USER ID BEFORE DIALOG:', request.userId);


    const dialogRef = this.dialog.open(
      RequestDetailsDialogComponent,
      {
        width: '700px',
        maxWidth: '95vw',
        data: request
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Updated request:', result);

        // Reload your requests here if needed
        this.requestsService.updateRequest(
      result.requestId,
      {
        statusId: result.statusId,
        message: result.message
      }
    ).subscribe({

      next: () => {
        console.log('Status updated successfully');

        // Reload the table
        this.loadRequests();
      },

      error: (error) => {
        console.error('Update failed:', error);
      }

    });
      }
    });
  }

  loadRequests(): void {
  this.requestsService.getMyRequests().subscribe({
    next: (data) => {
      this.requests = data;
    },
    error: (error) => {
      console.error('Failed to load requests:', error);
    }
  });
}
  
}