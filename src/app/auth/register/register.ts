import { Component, inject } from '@angular/core';
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
import { NotificationService } from '../../shared/services/notification';

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
private notification = inject(NotificationService);

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
      //id: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      BirthDate: ['', Validators.required],
      
      Phone: ['', Validators.required]
    });
  


    
    // ✅ react to result with effect
   effect(() => {
  const response = this.registerResult();
  console.log('Register response:', response);
  if (!response) return;

  if (response.success) {
    // Navigate to login after successful registration
    this.notification.success('Registration successful! Please log in.');
    this.router.navigate(['/login']);
  } else {
    this.notification.error(response.message);
    

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
      //id: Number(raw.id),
      FirstName: raw.FirstName,
      LastName: raw.LastName,
      Email: raw.Email,
      Password: raw.Password,
      BirthDate: raw.BirthDate,
      Phone: raw.Phone,
       roleId: 2 
      });
  }
}
