import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { ApiResponse, AuthService } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

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
  //submitted = false;
  submitted = signal(false);
  // trigger signal
  private submitSignal = signal<any | null>(null);

  // convert Observable → Signal
  registerResult = toSignal<ApiResponse<string>>(
  toObservable(this.submitSignal).pipe(
    switchMap(data => data ? this.auth.register(data) : EMPTY)
  ),
  { initialValue: null }
);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // ✅ Initialize the form here, after fb is available
    this.regForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      
      phone: ['', Validators.required]
    });
  


    // ✅ react to result with effect
    effect(() => {
      const response = this.registerResult();
      if (!response) return;

      if (response.data?.length > 0) {
        this.auth.saveToken(response.data);
        this.router.navigate(['/cars']);
      } else {
        this.router.navigate(['/login']);
      }
    });
}

submit() {
  //this.submitted = true;
  this.submitted.set(true);

  if (this.regForm.invalid) {
    this.regForm.markAllAsTouched();
     console.log("ok");
    return;
  }

  const raw = this.regForm.getRawValue();

  
 this.submitSignal.set({
      id: Number(raw.id),
      name: raw.name,
      lastname: raw.lastname,
      email: raw.email,
      password: raw.password,
      birthdate: raw.birthdate,
      phone: raw.phone
      });
  }
}
