import { MyCarInfo } from'../../models/myCar';
import { MyCarCreateDto } from '../../models/myCarCreateDto';
import { Component, signal  } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common'; // ✅ Import AsyncPipe
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TruckService } from '../truck.service';
import { Item } from '../../shared/item/item';
import { MatDialogModule } from '@angular/material/dialog';
import { CarDetailsDialogComponent } from '../../dialogs/car-details-dialog.component/car-details-dialog.component';
import { RequestInfoComponent } from '../../car/request-info/request-info';
import { MyCarUpdateDto } from '../../models/MyCarUpdateDto';
import { AddItemButtonComponent } from '../../shared/add-item-button/add-item-button';
import { ApiResponse, AuthService } from '../../auth/auth';
import { SearchComponent } from '../../search/search';


@Component({
  selector: 'app-truck-list',
  standalone: true,
  templateUrl: './truck-list.component.html',
  imports: [
    CommonModule,   
    Item,      // ✅ Needed for *ngIf, @for, etc.
   // AsyncPipe,            // ✅ Fixes "No pipe found with name 'async'"
    MatButtonModule,
    AddItemButtonComponent,
    MatDialogModule,
    SearchComponent
    
  ]
})
export class TruckListComponent {
  trucks = signal<MyCarInfo[]>([]);
  filteredTrucks = signal<MyCarInfo[]>([]);
  searchText = '';

  constructor(private truckService: TruckService, private dialog: MatDialog, private loggedUserService: AuthService,private authService: AuthService) {}
  
  trackById(index: number, truck: MyCarInfo) {
  return truck.id;
  }

  ngOnInit() {
    this.loadTrucks();
  }
loadTrucks() {
  this.truckService.getAll().subscribe({
    next: (res) => {
      console.log('📥 Trucks received:', res);
       this.trucks.set(res.data);
        this.filteredTrucks.set(res.data);
    },
    error: (err) => console.error('❌ Error loading trucks:', err)
  });
}

addTruck(truck: MyCarCreateDto | MyCarInfo) {
  if (!truck) return;

  const payload: MyCarCreateDto = {
    vehicleTypeId: 2, // 🚛 TRUCK (adjust if needed)
    model: truck.model,
    color: truck.color,
    date: truck.date,
    price: truck.price,
    details: truck.details,
    image: truck.image
  };

  this.truckService.addTruck(payload).subscribe({
    next: (response: MyCarInfo) => {
      console.log('Truck added:', response);
      this.loadTrucks();
    },
    error: (err) => console.error('Error adding truck:', err)
  });
}
  openAddCarDialog(): void {
    
  }

editTruck(truck: MyCarUpdateDto): void {

  const payload: MyCarUpdateDto = {
    id: truck.id,
    vehicleTypeId: truck.vehicleTypeId,
    model: truck.model,
    color: truck.color,
    date: truck.date,
    price: truck.price,
    details: truck.details,
    image: truck.image
  };

  this.truckService.updateTruck(truck.id, payload).subscribe({
   next: (updated: MyCarInfo) => {
    window.location.reload();
      const updatedList = this.trucks().map(t =>
        t.id === updated.id ? updated : t
      );

      this.trucks.set(updatedList);

      console.log('Truck updated:', updated);
    },

    error: (err) => {
      console.error('Update failed:', err);
      //this.loadTrucks();
     
    }
  });
}

filteredCars(cars: MyCarInfo[]){

  
}
deleteTruck(truck: MyCarInfo): void {
  this.truckService.deleteTruck(truck.id).subscribe({
    next: () => {
      const updatedList = this.trucks().filter(t => t.id !== truck.id);
      this.trucks.set(updatedList);
      console.log('Truck deleted successfully');
    },
    error: (err) => console.error('Error deleting truck:', err)
  });
}

 detailsTruck(car: MyCarInfo) {
  this.dialog.open(CarDetailsDialogComponent, {
    width: '600px',
    data: car
  });
}

requestInfoCar(trtuckId: number): void {
    console.log('Request info for truck:', trtuckId);
  }

openRequestInfoDialog(car: MyCarInfo) {
  const token = this.loggedUserService.getToken();

  if (!token) {
    console.error('User not logged in');
    alert('Please log in first.');
    return;
  }

 const user = this.authService.getUser(); // returns { firstName, lastName, email, phone }

this.dialog.open(RequestInfoComponent, {
  width: '650px',
  data: {
    user,        // pass the whole user object
    vehicle: car, // car/truck info
    token: user?.token // optional if needed
  }
});
}
}