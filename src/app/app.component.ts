/*
import { AuthService } from './auth/auth';
import { Component } from '@angular/core';
//import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CarListComponent } from './car/car-list.component/car-list.component';
//import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingService } from '../services/loading.service';
import { Router,RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-root',
  standalone: true,          // marks this component as standalone
  imports: [CommonModule, RouterLink, RouterOutlet, MatProgressSpinnerModule],  // import child components & modules
  templateUrl: './app.component.html',
  styleUrl: './app.css',
})



export class AppComponent {
  title = 'App Component';
  constructor(public loadingService: LoadingService,public auth: AuthService,public router: Router  ) {}
}
  */
 import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';
import { AuthService } from './auth/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']   // ✅ fixed typo
})
export class AppComponent {
  title = 'App Component';

  constructor(
    public loadingService: LoadingService,
    public auth: AuthService,
    public router: Router
  ) {
    // ✅ Remove invalid token automatically on app startup
    if (!this.auth.isLoggedIn()) {
      this.auth.logout();
      // Optionally redirect to login immediately
      this.router.navigate(['/login']);
    }
  }
}
