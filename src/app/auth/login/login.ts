

import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../shared/services/notification';
import { AuthService } from '../../../services/auth.service';

interface LoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
  roleId: number;
}



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule

  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  private notification = inject(NotificationService);
  submitted = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }



  submit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: (isSuccess: boolean) => {
        debugger;
        console.log('LOGIN RESPONSE:', isSuccess);


        if (isSuccess == false) {
          //alert('Login failed');
          this.notification.error('Login failed');
          return;
        }
      }
    });
  }
}