import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';
//import { AuthService } from './auth/auth';
import { SidebarComponent } from '../sidebar/sidebar';
//import { MyRequestsComponent } from '../my-requests/my-requests';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatProgressSpinnerModule,
    SidebarComponent,
    //MyRequestsComponent
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
get isAdmin(): boolean {
    return this.auth.getRoleId() === 1;
  }


logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}