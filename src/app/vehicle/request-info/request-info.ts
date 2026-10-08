

import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestInfoService } from '../../../services/request-info.service';
import { NotificationService } from '../../shared/services/notification';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-info',
  standalone: true,
  templateUrl: './request-info.html',
  styleUrls: ['./request-info.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class RequestInfoComponent implements OnInit {

  private notification = inject(NotificationService);
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

  ngOnInit(): void {

    console.log('Dialog received data:', this.data);
    console.log('USER:', this.data?.user);

    let user = this.data?.user ?? {};
    const vehicle = this.data?.vehicle;

    if (typeof user === 'string') {
      try {
        user = JSON.parse(user);
      } catch (error) {
        console.error('Failed to parse user:', error);
        user = {};
      }
    }

    console.log('PARSED USER:', user);

    // Get email from JWT
    const email =
      user?.email ||
      user?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ] ||
      '';

    console.log('USER EMAIL:', email);

    this.form.patchValue({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: email,
      phone: user?.phone || '',
      model: vehicle?.model || '',
      color: vehicle?.color || '',
      price: vehicle?.price || ''
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  send(): void {

    console.log('SEND CLICKED');

    console.log('DATA CHECK:', {
      user: this.data?.user,
      vehicle: this.data?.vehicle,
      carId: this.data?.vehicle?.id,
      userId: this.data?.user?.id,
      form: this.form.value
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('Form is invalid');
      return;
    }

    // Get user
    let user = this.data?.user ?? {};

    if (typeof user === 'string') {
      try {
        user = JSON.parse(user);
      } catch (error) {
        console.error('Invalid user data:', error);

        this.notification.error(
          'User data error. Please login again.'
        );

        return;
      }
    }

    console.log('PARSED USER FOR SEND:', user);

    // IDs
    const carId = Number(this.data?.vehicle?.id);
    const userId = Number(user?.id);

    // Get email from JWT
    const email =
      user?.email ||
      user?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ] ||
      this.form.value.email ||
      '';

    // Get message
    const message =
      this.form.get('message')?.value?.trim() || '';

    // Validate
    if (!carId || !userId || !message.length) {

      console.error('Missing required fields:', {
        carId,
        userId,
        email,
        message
      });

      this.notification.error(
        'Missing required data'
      );

      return;
    }

    // Create payload
    const payload = {
      carId: carId,
      userId: userId,

      firstName: this.form.value.firstName || '',
      lastName: this.form.value.lastName || '',

      phone: this.form.value.phone || '',
      email: email,

      model: this.form.value.model || '',
      color: this.form.value.color || '',
      price: this.form.value.price || '',

      message: message
    };

    console.log('SENDING REQUEST:', payload);

    this.requestService.sendRequest(payload).subscribe({

      next: (res) => {

        console.log('SUCCESS:', res);

        this.notification.success(
          'Request sent successfully'
        );

        this.dialogRef.close(true);
      },

      error: (err) => {

        console.error('REQUEST FAILED:', err);
        console.error('STATUS:', err?.status);
        console.error('ERROR BODY:', err?.error);

        this.notification.error(
          err?.error?.message ||
          err?.error?.data ||
          'Failed to send request'
        );
      }

    });
  }
}