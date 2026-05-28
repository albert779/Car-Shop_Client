import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddOrEdit } from '../../shared/dialog-add-or-edit/dialog-add-or-edit';
import { MyCarInfo } from '../../models/myCar';
import { MyCarUpdateDto } from '../../models/MyCarUpdateDto';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './item.html',
  styleUrls: ['./item.css']
})
export class Item {

  @Input({ required: true }) itemInfo!: MyCarInfo;
  @Input({ required: true }) type!: 'car' | 'truck';

  @Output() edit = new EventEmitter<MyCarUpdateDto>();
  //@Output() delete = new EventEmitter<MyCarInfo>();
  @Output() delete = new EventEmitter<MyCarInfo>();
  @Output() viewDetails = new EventEmitter<MyCarInfo>();
  //@Output() requestInfo = new EventEmitter<MyCarInfo>();
  @Output() requestInfo = new EventEmitter<MyCarInfo >();
  @Output() saved = new EventEmitter<void>();

  constructor(private readonly dialog: MatDialog) { }

  onEditClick() {
    // Open dialog with the car/truck data
    const dialogRef = this.dialog.open(DialogAddOrEdit, { data: this.itemInfo });
    dialogRef.afterClosed().subscribe((result: MyCarUpdateDto | undefined) => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }

  onDeleteClick() {
    this.delete.emit(this.itemInfo);
  }

  onDetails() {
    this.viewDetails.emit(this.itemInfo);
  }

  onRequestInfo() {
    this.requestInfo.emit(this.itemInfo );
  }

  clicked() {
  this.saved.emit();
}
}