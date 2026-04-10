import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MyCarInfo } from '../../models/myCar';
import { MyCarCreateDto } from '../../models/myCarCreateDto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-or-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-add-or-edit.html',
  styleUrls: ['./dialog-add-or-edit.css']
})
export class DialogAddOrEdit {
  carForm: FormGroup;
  selectedImageBase64: string | null = null;
  isEditMode = false;
  public data!: MyCarCreateDto | MyCarInfo;

  constructor(
    private dialogRef: MatDialogRef<DialogAddOrEdit>,
    private fb: FormBuilder,
    private injector: Injector
  ) {
    // ✅ get the data using the Injector
    this.data = this.injector.get(MAT_DIALOG_DATA) as MyCarCreateDto | MyCarInfo;
    this.isEditMode = !!this.data;

    this.carForm = this.fb.group({
      model: [this.data?.model || '', Validators.required],
      color: [this.data?.color || '', Validators.required],
      date: [this.data?.date || '', Validators.required],
      price: [this.data?.price || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      details: [this.data?.details || '', Validators.required],
      image: [this.data?.image || '']
    });

    if (this.data?.image) {
      this.selectedImageBase64 = this.data.image;
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
        this.carForm.patchValue({ image: this.selectedImageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  submitted = false;

  save() {
  const formValue = this.carForm.value;

  // ✅ FIRST check if data exists
  if (this.data && 'id' in this.data) {
    // EDIT mode
    const updated = {
      ...this.data,
      ...formValue
    };

    this.dialogRef.close(updated);
  } else {
    // ADD mode
    this.dialogRef.close(formValue);
  }
}
}