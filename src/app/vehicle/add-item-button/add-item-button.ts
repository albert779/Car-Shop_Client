import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddOrEdit } from '../../shared/dialog-add-or-edit/dialog-add-or-edit';
import { MyCarCreateDto } from '../../models/myCarCreateDto';
import { MyCarInfo } from '../../models/myCar';
@Component({
  selector: 'app-add-item-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './add-item-button.html'
})
export class AddItemButtonComponent {
  @Output() saved = new EventEmitter<MyCarCreateDto | MyCarInfo>();

  constructor(private dialog: MatDialog) {}

  openDialog() {
    //const dialogRef = this.dialog.open(DialogAddOrEdit, { data: null });
    const dialogRef = this.dialog.open(DialogAddOrEdit, {
    width: '650px',
    maxWidth: '95vw',
    maxHeight: '90vh',
  });

    dialogRef.afterClosed().subscribe((result: MyCarCreateDto | MyCarInfo | undefined) => {
      if (result) {
        this.saved.emit(result);
      }
    });
  }
}