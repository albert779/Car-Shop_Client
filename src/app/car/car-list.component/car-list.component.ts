
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
import { LocalStorageService } from '../../../local-storage/local-storage';


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
    
  ]
})
export class CarListComponent {
  cars = signal<MyCarInfo[]>([]);
  auth: any;
  //storage: any;

  constructor(private carService: CarService, private dialog: MatDialog,private authService: AuthService, private storage: LocalStorageService,) {}

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
        this.cars.set(response.data); // ✅ update the signal
      },
      error: (err) => console.error('❌ Error loading cars:', err)
    });
  }

  addCar(car: MyCarCreateDto | MyCarInfo) {
  if (!car) return;

  this.carService.addCar(car).subscribe({
    next: (response) => {
      console.log('Car added:', response.data);
      this.loadCars(); // refresh list
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

 /*
openRequestInfoDialog(car: MyCarInfo) {
  const isLoggedIn = this.authService.isLoggedIn(); // just check if logged in

  if (!isLoggedIn) {
    console.error('User not logged in');
    alert('Please log in first.');
    return;
  }

 
 const user = this.authService.getUser(); // returns { firstName, lastName, email, phone }
console.log('Logged-in user:', user);

const loggedInUser = this.storage.getValueFromStore('user'); // get user from storage

if (!user) {
  console.warn('No logged-in user');
  return;
}

this.dialog.open(RequestInfoComponent, {
  width: '650px',
  data: {
    user: loggedInUser,     // pass the whole user object
    vehicle: car, // car/truck info
    token: user?.token // optional if needed
  }
});
}
}
*/

/*
 openRequestInfoDialog(car: MyCarInfo) {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      console.error('User not logged in');
      alert('Please log in first.');
      return;
    }

    // Get user info (from auth service or storage)
    const loggedInUser = this.authService.getUser() || this.storage.getValueFromStore('user');

    if (!loggedInUser) {
      console.warn('No logged-in user');
      alert('User info missing. Please log in again.');
      return;
    }

    console.log('Logged-in user:', loggedInUser);

    // Open dialog with consistent data
    this.dialog.open(RequestInfoComponent, {
      width: '650px',
      data: {
        user: loggedInUser,       // ✅ always the same user object
        vehicle: car,             // car/truck info
        token: loggedInUser?.token // optional
      }
    });
  }
}
  */

/*
openRequestInfoDialog(car: MyCarInfo) {
  // 1️⃣ Check if user is logged in
  const isLoggedIn = this.authService.isLoggedIn();
  if (!isLoggedIn) {
    alert('Please log in first.');
    return;
  }

  // 2️⃣ Try to get user from AuthService
  let loggedInUser = this.authService.getUser();

  // 3️⃣ Fallback: get user from LocalStorage
  if (!loggedInUser) {
    const userStored = this.storage.getValueFromStore('user');

    if (!userStored || userStored === 'undefined') {
      alert('User info missing. Please log in again.');
      return;
    }

    try {
      // ✅ Parse the JSON string safely
      loggedInUser = JSON.parse(userStored as string);
    } catch (err) {
      console.error('Failed to parse user from storage', err);
      alert('User info missing. Please log in again.');
      return;
    }
  }

  // 4️⃣ Log for debugging
  console.log('Logged-in user:', loggedInUser);

  // 5️⃣ Open the Request Info dialog
  this.dialog.open(RequestInfoComponent, {
    width: '650px',
    data: {
      //user: loggedInUser,  
      user: this.storage.getValueFromStore('user'),               // object with user info
      vehicle: car,                        // the car info
      token: (loggedInUser as any)?.token || null // optional token
      
    }
  });
}
}
*/
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