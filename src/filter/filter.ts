/*
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
     DatePipe
  ],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css']
})
export class FilterComponent {

  filter = {
  search: '',
  statusId: null as number | null,
  fromDate: null as string | null,
  toDate: null as string | null

  };


  @Output() filterChanged = new EventEmitter<any>();


  load() {
    this.filterChanged.emit(this.filter);
  }

  newRequest(): void {
  console.log('New request clicked');
}

}
*/

/*
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
  fromDate: string | null;
  toDate: string | null;

}


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


  filter: RequestFilter = {

    search: '',
    statusId: null,
    fromDate: null,
    toDate: null

  };


  @Output()
  filterChanged = new EventEmitter<RequestFilter>();


  load(): void {
    console.log('Sending filter:', this.filter);
    this.filterChanged.emit({ ...this.filter });
  }

  clearFilter() {

  this.filter = {
    search: '',
    statusId: null,
    fromDate: null,
    toDate: null
  };

  this.filterChanged.emit(this.filter);
}

  applyFilter() {
    console.log('Sending filter:', this.filter);
    this.filterChanged.emit(this.filter);
  }

*/

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
          
          /*
          applyFilter(): void { 
            console.log('Sending filter:', this.filter); 
            this.filterChanged.emit({ ...this.filter });
           } 
            */

           applyFilter(): void {
  const filterToSend: RequestFilter = {
    search: this.filter.search?.trim() || '',
    statusId: this.filter.statusId,
    fromDate: null,
    toDate: null
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

