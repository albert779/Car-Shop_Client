import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/auth/auth';
@Component({
  selector: 'app-unauthorized',
  standalone: true,
  templateUrl: './unauthorized.html',
  styleUrls: ['./unauthorized.css']
})
export class UnauthorizedComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}