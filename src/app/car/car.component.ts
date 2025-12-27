import { Component, Input, input,Output, OnInit,EventEmitter, signal  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import { MatDividerModule } from '@angular/material/divider';
 import { MatTooltipModule } from '@angular/material/tooltip';

 import {MyCar} from  './myCar';


@Component({
  selector: 'app-cars',
  standalone: true,
   imports: [CommonModule, DatePipe, MatCardModule, MatButtonModule,MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarsComponent implements OnInit {
  /** Car object passed from parent (CarListComponent) */
  //@Input() car!: MyCar;

  //@Input({ required: true }) car!: MyCar;
  @Output() edit = new EventEmitter<MyCar>();  // 🔥 add this line
  @Output() delete = new EventEmitter<number>(); // optional, for delete
  @Output() details = new EventEmitter<MyCar>(); // optional, for delete
  @Input() car: MyCar | undefined;

  /** Show loading spinner while waiting for data */
  showDetails = false;

  ngOnInit(): void {
   
  }
   onEditClick() {
    this.edit.emit(this.car);
  }
  onDeleteClick() {
    this.delete.emit(this.car?.id);
  }

  onDetailsClik(): void{
    this.details.emit(this.car);
  }
}