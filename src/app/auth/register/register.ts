import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  regForm: FormGroup;  // just declare it here
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // ✅ Initialize the form here, after fb is available
    this.regForm = this.fb.group({
     // id: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      
      phone: ['', Validators.required]
    });
  }
submit() {
  this.submitted = true;

  if (this.regForm.invalid) {
    this.regForm.markAllAsTouched();
     console.log("ok");
    return;
  }

  const raw = this.regForm.getRawValue();

  const data = {
    name: raw.name!,
    lastname: raw.lastname!,
    email: raw.email!,
    password: raw.password!,
    birthdate: raw.birthdate!,   // ISO string from <input type="date">
    phone: raw.phone!
  };

  this.auth.register(data).subscribe({
    next: () => this.router.navigate(['/login']),
    error: err => {
      console.error(err);
      alert('Registration failed!');
    }
  });
}
}