import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="unauthorized">
      <h1>🚫 Access Denied</h1>
      <p>You don’t have permission to access this page.</p>

      <button (click)="goHome()">Go Home</button>
      <button (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .unauthorized {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    button {
      margin: 8px;
    }
  `]
})
export class UnauthorizedComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}