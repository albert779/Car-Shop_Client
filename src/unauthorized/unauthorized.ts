import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  templateUrl: './unauthorized.html',
  styleUrls: ['./unauthorized.css']
})
export class UnauthorizedComponent {
  constructor(private router: Router, private storage: LocalStorageService) {}

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.storage.removeValueFromStore('token');
    this.router.navigate(['/login']);
  }
}