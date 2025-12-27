import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';      // ✅ Required for <mat-card>
import { MatButtonModule } from '@angular/material/button';  // ✅ Required for <button mat-button>
import { MatDialog } from '@angular/material/dialog';
import { DialogAddOrEdit } from '../dialog-add-or-edit/dialog-add-or-edit';
import { MyCar } from '../../car/myCar';


@Component({
  selector: 'app-item',
   imports: [
    CommonModule,
    MatCardModule,      
    MatButtonModule
  ], 
  templateUrl: './item.html',
  styleUrl: './item.css'
})
export class Item {
  @Input({ required: true }) itemInfo!: MyCar;
  @Output() edit = new EventEmitter<MyCar>();
  @Output() delete = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<MyCar>();
  private dialogRef$: any;


  constructor(private readonly dialog: MatDialog){
    
  }

  onEditClick() {
    // Open dialog with the truck data
      this.dialogRef$ = this.dialog.open(DialogAddOrEdit, { data: this.itemInfo });
      this.dialogRef$.afterClosed().subscribe((result: MyCar | undefined) => {
      console.log(result);
        this.edit.emit(result);
      });
    }

    onDeleteClick() {
     this.delete.emit(this.itemInfo.id);
  }


  onDetails() {
  this.viewDetails.emit(this.itemInfo);
}

}
