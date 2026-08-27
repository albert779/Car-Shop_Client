

import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage';
import { jwtDecode } from 'jwt-decode';
import { NotificationService } from '../../shared/services/notification';

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
    private router: Router,
    private storage: LocalStorageService
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
      next: (response: any) => {

        console.log('LOGIN RESPONSE:', response);

        const data = response?.data;

        if (!data?.token) {
          //alert('Login failed');
          this.notification.error('Login failed');
          return;
        }

        const decoded: any = jwtDecode(data.token);
        const userId = decoded?.id;


        if (!decoded?.roleId) {
          this.notification.error('missing roleId in token');
          return;
        }

        ///
        const roleId: string = decoded.roleId;
        const roleName = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        this.storage.setValueInStore('roleId', roleId);
        this.storage.setValueInStore('roleName', roleName);


        // ✅ Save user (NOW includes id)
        const user = {
          id: Number(userId), // 🔥 FIX for your "undefined userId" issue
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          roleId: roleId,
          token: data.token
        };

        this.auth.setUser(user);

        //this.router.navigateByUrl('/cars');
        this.notification.success('Login successful!');
        // this.router.navigateByUrl('/cars');
        if (roleId === '1') {

          this.router.navigateByUrl('/dashboard');

        }
        else {

          this.router.navigateByUrl('/cars');

        }

      },

      error: (err) => {
        console.error(err);
        this.auth.logout();
      }
    });
  }
}