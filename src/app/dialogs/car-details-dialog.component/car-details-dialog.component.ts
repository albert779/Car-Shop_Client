import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MyCar } from '../../car/myCar'; // adjust path

@Component({
  selector: 'app-car-details-dialog',
  standalone: true,
  templateUrl: './car-details-dialog.component.html',
  styleUrls: ['./car-details-dialog.component.css'],
  imports: [CommonModule, MatDialogModule], // ✅ import dialog & common module
})
export class CarDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MyCar) {}
}
