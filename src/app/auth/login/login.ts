

import { Component, OnInit } from '@angular/core';
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
import { LocalStorageService } from '../../../local-storage/local-storage';

interface LoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
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


  /*
submit(): void {
  this.submitted = true;
  if (this.loginForm.invalid) return;

  this.auth.login(this.loginForm.value).subscribe({
    next: (response: any) => {

      console.log('LOGIN RESPONSE:', response);

      // handle both possible backend formats
      const token =
        typeof response.data === 'string'
          ? response.data
          : response.data?.token;

      if (!token) {
        console.error('Token not found in response', response);
        alert('Login failed: token missing');
        return;
      }

      // save token
      this.auth.setToken(token);
      //this.auth.setUser(user);

      const redirectUrl = (this.storage.getValueFromStore('redirectUrl')as string) || '/cars';
      this.storage.removeValueFromStore('redirectUrl');

      this.router.navigateByUrl(redirectUrl);
    },

    error: (err) => {
      console.error(err);
      this.auth.logout();
      alert('Login failed!');
    }
  });
}
}
*/





/*
submit(): void {
  this.submitted = true;
  if (this.loginForm.invalid) return;

  this.auth.login(this.loginForm.value).subscribe({
    next: (user) => {
      console.log('Logged-in user:', user);


      // 🔒 Safety check
      if (!user || !user.token) {
        console.error('❌ Invalid user response:', user);
        alert('Login failed: invalid response');
        return;
      }

      // ✅ VERY IMPORTANT: save user + token
      this.auth.setUser(user);

      const redirectUrl =
        this.storage.getValueFromStore('redirectUrl') || '/cars';

      this.storage.removeValueFromStore('redirectUrl');
      this.router.navigateByUrl(redirectUrl);
    },
    error: (err) => {
      console.error(err);
      this.auth.logout();
      alert('Login failed!');
    }
  });
}
}
*/

submit(): void {
  this.submitted = true;
  if (this.loginForm.invalid) return;

  this.auth.login(this.loginForm.value).subscribe({
    next: (response: any) => {

      console.log('LOGIN RESPONSE:', response);

      const data = response.data;

      if (!data?.token) {
        alert('Login failed');
        return;
      }

      // ✅ Save token
      this.auth.setToken(data.token);

      // ✅ Save user (INCLUDING phone)
      this.auth.setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        token: data.token
      });

      this.router.navigateByUrl('/cars');
    },

    error: (err) => {
      console.error(err);
      this.auth.logout();
      alert('Login failed!');
    }
  });
}
}