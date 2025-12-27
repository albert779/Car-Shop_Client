import { MyCar } from '../../car/myCar';
import { Component,Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-dialog-add-or-edit',
 standalone: true,
  imports: [CommonModule,
           ReactiveFormsModule,
           FormsModule, 
           MatFormFieldModule,
            MatInputModule,
             MatButtonModule
            ],

  templateUrl: './dialog-add-or-edit.html',
  styleUrl: './dialog-add-or-edit.css'
})
export class DialogAddOrEdit {
 carForm: FormGroup;
  selectedImageBase64: string | null = null;
  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<DialogAddOrEdit>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MyCar 
  ) {
    this.isEditMode = !!data;

    // Initialize form
    this.carForm = this.fb.group({
      model: [data?.model || '', Validators.required],
      color: [data?.color || '', Validators.required],
      date: [data?.date || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      details: [data?.details || '', Validators.required],
      image: [data?.image || '']
    });

    // Preload image if exists
    if (data?.image) {
      this.selectedImageBase64 = data.image;
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

  save(): void {

  this.submitted = true;

  if (this.carForm.invalid) {
    return; // stop save, show validation messages
  }

  const formValue = this.carForm.value;

  const result: MyCar = {
    ...this.data,          // keep id, type, and any existing fields
    ...formValue,          // override with new values
    id: this.data?.id ?? 0, // ensure ID is kept for editing
     image: this.selectedImageBase64 ?? formValue.image 
  };

  this.dialogRef.close(result);
}
}
