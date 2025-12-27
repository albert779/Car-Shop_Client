import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule,FormGroup, } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
export class LoginComponent {

  submitted = false;

  loginForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    // ✅ Safe to initialize the form here
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

/*
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  */

  submit() {
  this.submitted = true;
  if (this.loginForm.invalid) return;

  const body = {
    email: this.loginForm.value.email ?? '',
    password: this.loginForm.value.password ?? ''
  };

  this.auth.login(body).subscribe({
    next: () => this.router.navigate(['/cars']),
    error: () => alert('Login failed!')
  });
}
}