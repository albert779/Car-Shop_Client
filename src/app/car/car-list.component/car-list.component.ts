
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CarService } from '../car.service';
import { Item } from '../../shared/item/item';
import { CarDetailsDialogComponent } from '../../dialogs/car-details-dialog.component/car-details-dialog.component';
import { RequestInfoComponent } from '../request-info/request-info';
import { AddItemButtonComponent } from '../../shared/add-item-button/add-item-button';

import { MyCarInfo } from '../../models/myCar';
import { MyCarCreateDto } from '../../models/myCarCreateDto';
import { MyCarUpdateDto } from '../../models/MyCarUpdateDto';

import { AuthService } from '../../auth/auth';
import { LocalStorageService } from '../../../services/local-storage';
import { SearchComponent } from '../../search/search';



@Component({
  selector: 'app-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  imports: [
    CommonModule,
    Item,
    MatButtonModule,
    AddItemButtonComponent,
    MatDialogModule,
    SearchComponent
  ]
})
export class CarListComponent {
  cars = signal<MyCarInfo[]>([]);
  filteredCars = signal<MyCarInfo[]>([]);
  searchText = '';

  //storage: any;

  constructor(private carService: CarService, private dialog: MatDialog, private authService: AuthService, private storage: LocalStorageService,) { }

  ngOnInit() {
    this.loadCars();
  }

  trackByCarId(index: number, car: MyCarInfo) {
    return car.id;
  }

  // Load cars from backend
  loadCars() {
    this.carService.getCars().subscribe({
      next: (response) => {
        console.log('📥 Cars received:', response);
        this.cars.set(response.data);
        this.filteredCars.set(response.data);
      },
      error: (err) => console.error('❌ Error loading cars:', err)
    });
  }

  addCar(car: MyCarCreateDto | MyCarInfo) {
    if (!car) return;

    const payload: MyCarCreateDto = {
      vehicleTypeId: 1,
      model: car.model,
      color: car.color,
      date: car.date,
      price: car.price,
      details: car.details,
      image: car.image
    };

    this.carService.addCar(payload).subscribe({
      next: (response) => {
        console.log('Car added:', response.data);
        this.loadCars();
      },
      error: (err) => console.error('Error adding car:', err)
    });
  }


  editCar(car: MyCarUpdateDto): void {
    this.carService.updateCar(car.id, car).subscribe({
      next: (res: MyCarInfo) => {
        // Update the specific car in the reactive signal
        const updatedList = this.cars().map(c => c.id === res.id ? res : c);
        this.cars.set(updatedList);
        window.location.reload();

        console.log('Car updated successfully:', res);
        // No need for window.location.reload()
      },
      error: (err: any) => {
        console.error('Update failed:', err);
        // Fallback: reload the full list from server
        this.loadCars();
      }
    });
  }

  // Delete car
  deleteCar(car: MyCarInfo): void {
    this.carService.deleteCar(car.id).subscribe({
      next: () => {
        console.log('Car deleted successfully');
        this.loadCars();
      },
      error: (err) => console.error('Error deleting car:', err)
    });
  }

  // Show car details dialog
  detailsCar(car: MyCarInfo) {
    this.dialog.open(CarDetailsDialogComponent, {
      width: '600px',
      data: car
    });
  }

  // Request info
  requestInfoCar(carId: number): void {
    console.log('Request info for car:', carId);
  }




  openRequestInfoDialog(car: MyCarInfo): void {
    // 1️⃣ Check login
    if (!this.authService.isLoggedIn()) {
      alert('Please log in first.');
      return;
    }

    // 2️⃣ Get user from AuthService or fallback to storage
    let user = this.authService.getUser();

    if (!user) {
      const stored = this.storage.getValueFromStore('user');

      if (!stored) {
        alert('User info missing. Please log in again.');
        return;
      }

      try {
        user = typeof stored === 'string' ? JSON.parse(stored) : stored;
      } catch (error) {
        console.error('Failed to parse user from storage:', error);
        alert('User info corrupted. Please log in again.');
        return;
      }
    }



    // 3️⃣ Open dialog with BOTH user + vehicle
    this.dialog.open(RequestInfoComponent, {
      width: '400px',
      data: {
        user: user,
        vehicle: car
      }
    });
  }
}


