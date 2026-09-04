


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingService } from '../services/loading.service';
import { SidebarComponent } from '../sidebar/sidebar';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatProgressSpinnerModule,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  title = 'App Component';
  isManager: boolean = false;

  constructor(
    public loadingService: LoadingService,
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    const roleId = this.auth.getRoleId();
    this.setIsManagerRole(roleId);
  }

  private setIsManagerRole(roleId: number): void {
    this.isManager = roleId === 1;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}