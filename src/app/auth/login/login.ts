
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
// import { LocalStorageService } from '../app/local-storage/local-storage';

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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // // optional: if already logged in, redirect away from login
    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['/cars']);
    // }
  }

  
  /*
  submit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.auth.login(body).subscribe({
      next: () => {
        // ✅ token & role already saved in AuthService

        const redirectUrl =
          localStorage.getItem('redirectUrl') || '/cars';

        localStorage.removeItem('redirectUrl');
        this.router.navigateByUrl(redirectUrl);
      },
      error: () => {
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
      next: () => {
        // ✅ token + roleId are saved INSIDE AuthService

        const redirectUrl =
          localStorage.getItem('redirectUrl') || '/cars';

        localStorage.removeItem('redirectUrl');
        this.router.navigateByUrl(redirectUrl);
      },
      error: () => {
        this.auth.logout();
        alert('Login failed!');
      }
    });
  }
}