

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

  ngOnInit(): void {}



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

      // 🔥 IMPORTANT: try to get id safely
      let userId = data.id ?? null;


      if (!userId) {
        try {
          const decoded: any = jwtDecode(data.token);
          userId = decoded?.id; // ⚠️ depends on backend claim name
        } catch (e) {
          console.error('JWT decode failed', e);
        }
      }

      if (!userId) {
        console.error('User ID missing!');
        //alert('Login failed: user id missing');
         this.notification.error('Login failed: user id missing');
        return;
      }

      // ✅ Save token
      this.auth.setToken(data.token);

       this.storage.setValueInStore(
            'roleId',
            data.roleId.toString()
          );

      // ✅ Save user (NOW includes id)
      const user = {
        id:  Number(userId), // 🔥 FIX for your "undefined userId" issue
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
         roleId: data.roleId,
        token: data.token
      };

      this.auth.setUser(user);

      // (optional but recommended for dialogs)
      this.storage.setValueInStore('user', JSON.stringify(user));

      //this.router.navigateByUrl('/cars');
      this.notification.success('Login successful!');
     // this.router.navigateByUrl('/cars');
     if (data.roleId === 1) {

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