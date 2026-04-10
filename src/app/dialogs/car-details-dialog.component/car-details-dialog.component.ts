import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MyCarInfo } from '../../models/myCar';

@Component({
  selector: 'app-car-details-dialog',
  standalone: true, // make it standalone
  imports: [
    CommonModule,
    MatDialogModule, // ✅ for <mat-dialog-content>
    MatButtonModule  // ✅ for buttons like <button mat-button>
  ],
  templateUrl: './car-details-dialog.component.html',
  styleUrls: ['./car-details-dialog.component.css']
})
export class CarDetailsDialogComponent {
  public data!: MyCarInfo;

  constructor(
    private dialogRef: MatDialogRef<CarDetailsDialogComponent>,
    private injector: Injector
  ) {
    // ✅ Inject data passed to dialog
    this.data = this.injector.get(MAT_DIALOG_DATA) as MyCarInfo;
  }

  close(): void {
    this.dialogRef.close();
  }
}