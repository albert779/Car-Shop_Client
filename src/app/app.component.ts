import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './car/car-list.component/car-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingService } from '../services/loading.service';
import { RouterLink, RouterOutlet } from '@angular/router';
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
  constructor(public loadingService: LoadingService) {}
}