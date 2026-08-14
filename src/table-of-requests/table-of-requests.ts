import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-table-of-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
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

}