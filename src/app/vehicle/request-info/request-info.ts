import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestInfoService } from '../../../services/request-info.service';

@Component({
  selector: 'app-request-info',
  standalone: true,
  templateUrl: './request-info.html',
  styleUrls: ['./request-info.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class RequestInfoComponent implements OnInit {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RequestInfoComponent>);
  private data: any = inject(MAT_DIALOG_DATA);
  private requestService = inject(RequestInfoService);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    model: [''],
    color: [''],
    price: [''],
    phone: [''],
    message: ['', Validators.required]
  });

  ngOnInit() {
    console.log('Dialog received data:', this.data);  // 🔎 important
     console.log('USER:', this.data?.user);
   // if (!this.data || !this.data.vehicle) return;

    let user = this.data.user ?? {};       // user info
    const v = this.data.vehicle;

    if (typeof user === 'string') {
    try {
      user = JSON.parse(user);
    } catch (e) {
      console.error('Failed to parse user:', e);
      user = {};
    }
  }

  console.log('PARSED USER:', user);

    this.form.patchValue({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      model: v?.model || '',
      color: v?.color || '',
      price: v?.price || ''
    });
  }



  close() {
    this.dialogRef.close();
  }

  

send(): void {
  console.log("SEND CLICKED");

  console.log("DATA CHECK:", {
    user: this.data?.user,
    vehicle: this.data?.vehicle,
    carId: this.data?.vehicle?.id,
    userId: this.data?.user?.id,
    form: this.form?.value
  });

  if (!this.form || this.form.invalid) {
    console.warn("Form is invalid");
    return;
  }

  // ✅ safe user parsing
  let user = this.data?.user;

  if (typeof user === 'string') {
    try {
      user = JSON.parse(user);
    } catch (e) {
      console.error('Invalid user data', e);
      alert('User data error. Please login again.');
      return;
    }
  }

  // 🔥 normalize ids (IMPORTANT FIX)
  const carId = Number(this.data?.vehicle?.id);
  const userId = Number(user?.id);
  const message = this.form?.get('message')?.value?.trim();

  // ⚠️ strict validation
  if (!carId || !userId || !message?.length) {
    console.error("Missing required fields", { carId, userId, message });
    alert("Missing required data");
    return;
  }

  // ✅ payload
  const payload = {
   carId,
      userId,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      email: this.form.value.email,
      model: this.form.value.model,
      color: this.form.value.color,
      price: this.form.value.price,
      message: this.form.value.message // 🔥 correct field
  };

  console.log('SENDING REQUEST:', payload);

  this.requestService.sendRequest(payload).subscribe({
    next: (res) => {
      console.log("SUCCESS:", res);
      alert('Request sent successfully');
      this.dialogRef?.close(true);
    },
    error: (err) => {
      console.error('Request failed:', err);
      alert('Failed to send request');
    }
  });
}
}