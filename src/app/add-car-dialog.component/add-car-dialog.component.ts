import { Component,Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MyCar } from '../car/myCar';

@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [CommonModule,
           ReactiveFormsModule,
           FormsModule, 
           MatFormFieldModule,
            MatInputModule,
             MatButtonModule
            ],

           templateUrl: './add-car-dialog.component.html', // link to your HTML file
           styleUrls: ['./add-car-dialog.component.css']   // optional, for your CSS
},

  /*
  template: `
    <h2 mat-dialog-title>Add New Car</h2>
    <div mat-dialog-content [formGroup]="carForm">
      <mat-form-field appearance="fill">
        <mat-label>Model</mat-label>
        <input matInput [(ngModel)]="model">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Color</mat-label>
        <input matInput [(ngModel)]="color">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Date</mat-label>
        <input matInput type="date" [(ngModel)]="date">
      </mat-form-field>
    </div>

    <mat-form-field appearance="fill">
        <mat-label>Details</mat-label>
        <input matInput [(ngModel)]="details">
      </mat-form-field>

      <div class="image-upload">
  <button mat-stroked-button color="primary" type="button" (click)="fileInput.click()">
    Upload Image
  </button>
  <input
    #fileInput
    type="file"
    (change)="onFileSelected($event)"
    hidden
  />


    <!-- Small Preview -->
    <div *ngIf="selectedImageBase64" class="image-preview">
      <img [src]="selectedImageBase64" alt="Preview" />
    </div>
  </div>

  <!-- ✅ Preview 
  <div *ngIf="selectedImageBase64" class="image-preview">
    <img [src]="selectedImageBase64" alt="Car Image" />
  </div>
-->

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="save()">Add</button>
    </div>
  `
})
  */
 /*
 template: `
    <h2 mat-dialog-title>Add New Car</h2>
    <div mat-dialog-content [formGroup]="carForm">
      <mat-form-field appearance="fill">
        <mat-label>Model</mat-label>
        <input matInput formControlName="model" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Color</mat-label>
        <input matInput formControlName="color" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Date</mat-label>
        <input matInput type="date" formControlName="date" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Details</mat-label>
        <input matInput formControlName="details" />
      </mat-form-field>

      <div class="image-upload">
        <button mat-stroked-button color="primary" type="button" (click)="fileInput.click()">
          Upload Image
        </button>
        <input
          #fileInput
          type="file"
          (change)="onFileSelected($event)"
          hidden
        />
      </div>

      <!-- ✅ Small Preview -->
      <div *ngIf="selectedImageBase64" class="image-preview">
        <img [src]="selectedImageBase64" alt="Preview" />
      </div>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="save()">Add</button>
    </div>
  `,
})
  */
  
)


/*
export class AddCarDialogComponent {
  model = '';
  color = '';
  date = '';
  price='';
  details='';
  image="";

  carForm: FormGroup;
  selectedImageBase64: string | null = null;

  constructor(private dialogRef: MatDialogRef<AddCarDialogComponent>,private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: { car?: MyCar } ) 

  {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      color: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      details: ['',Validators.required],
      image: ['']
      });
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

  close() {
    this.dialogRef.close();
  }
    */

/*
  save() {
    this.dialogRef.close({
      model: this.model,
      color: this.color,
      date: this.date,
      details:this.details,
      image:this.image
    });
    if (this.carForm.valid) {
      this.dialogRef.close(this.carForm.value);
    }
  }
}
*/

/*

save() {
  if (this.carForm.valid) {
    const formValue = this.carForm.value;

    // include the base64 image you selected
    const carData = {
      ...formValue,
      image: this.selectedImageBase64 || formValue.image
    };

    this.dialogRef.close(carData);
  }
}
}
*/


export class AddCarDialogComponent {
  carForm: FormGroup;
  selectedImageBase64: string | null = null;
  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<AddCarDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MyCar 
  ) {
    this.isEditMode = false;

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

  save(): void {
    if (this.carForm.valid) {
      const formValue = this.carForm.value;
      const carData = {
        ...formValue,
        image: this.selectedImageBase64 || formValue.image
      };
      this.dialogRef.close(carData);
    }
  }
}
  