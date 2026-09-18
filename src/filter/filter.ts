
import { Component, EventEmitter, Output } from '@angular/core';
 import { FormsModule } from '@angular/forms'; 
 import { MatFormFieldModule } from '@angular/material/form-field'; 
 import { MatInputModule } from '@angular/material/input'; 
 import { MatSelectModule } from '@angular/material/select'; 
 import { MatButtonModule } from '@angular/material/button'; 
 import { MatIconModule } from '@angular/material/icon'; 
 import { MatDatepickerModule } from '@angular/material/datepicker'; 
 import { MatNativeDateModule } from '@angular/material/core'; 
 interface RequestFilter { 
  search: string; 
  statusId: number | null; 
  fromDate: Date | null; 
  toDate: Date | null; } 
  @Component({ 
    selector: 'app-filter', 
    standalone: true, 
    imports: [ 
      FormsModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatSelectModule,
       MatButtonModule, 
       MatIconModule, 
       MatDatepickerModule,
        MatNativeDateModule 
      ], 
      templateUrl: './filter.html',
       styleUrls: ['./filter.css'] 
      }) 
      export class FilterComponent { 
        @Output() filterChanged = new EventEmitter<RequestFilter>(); 
        filter: RequestFilter = { 
          search: '', 
          statusId: null, 
          fromDate: null, 
          toDate: null }; 
          
         constructor() {
           console.log('FILTER CREATED:', this.filter);
          }

           applyFilter(): void {

 console.log('BEFORE FILTER:');
  console.log('search:', this.filter.search);
  console.log('statusId:', this.filter.statusId);
  console.log('fromDate:', this.filter.fromDate);
  console.log('toDate:', this.filter.toDate);

  const filterToSend: RequestFilter = {
    search: this.filter.search?.trim() || '',
    statusId: this.filter.statusId,
    fromDate: this.filter.fromDate,
    toDate: this.filter.toDate
  };

  console.log('Sending filter:', filterToSend);

  this.filterChanged.emit(filterToSend);
}

            clearFilter(): void { this.filter = { 
              search: '', 
              statusId: null, 
              fromDate: null, 
              toDate: null }; 
              console.log('Clearing filter'); 
              this.filterChanged.emit({ ...this.filter }); 
            } 
          }

