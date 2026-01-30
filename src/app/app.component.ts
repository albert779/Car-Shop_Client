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
  }


logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}