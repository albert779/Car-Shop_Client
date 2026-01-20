

import { MyCar } from './../../car/myCar';
import { Component, signal  } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common'; // ✅ Import AsyncPipe
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CarService } from '../car.service';
import { Item } from '../../shared/item/item';
import { DialogAddOrEdit } from '../../shared/dialog-add-or-edit/dialog-add-or-edit';
import { MatDialogModule } from '@angular/material/dialog';
import { CarDetailsDialogComponent } from '../../dialogs/car-details-dialog.component/car-details-dialog.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  imports: [
    CommonModule,   
    Item,      // ✅ Needed for *ngIf, @for, etc.
   // AsyncPipe,            // ✅ Fixes "No pipe found with name 'async'"
    MatButtonModule,
    MatDialogModule
    
  ]
})
export class CarListComponent {
  cars = signal<MyCar[]>([]);
  dialogRef$!: any;
  constructor(private carService: CarService, private dialog: MatDialog) {}
  
  trackById(index: number, car: MyCar) {
  return car.id;
  }

  ngOnInit() {
    this.loadCars();
  }

loadCars() {
  this.carService.getCars().subscribe({
    next: (data) => {
      console.log('📥 Cars received:', data);
      this.cars.set(data);  // ✅ Update signal
    },
    error: (err) => console.error('❌ Error loading carss:', err)
  });

  this.carService.loadCars(); // fetch data from API
}


addCar() {
   console.log("Add Car clicked!");
  const dialogRef = this.dialog.open(DialogAddOrEdit, {
    width: '400px',
    data: null // or {} if you prefer
  });

  dialogRef.afterClosed().subscribe((result: MyCar | null | undefined) => {
    if (!result) return; // user closed dialog

    // Remove id for new truck
    result.id = undefined;

    this.carService.addCar(result).subscribe({
      next: (savedCar) => {
        console.log("Truck added:", savedCar);
        // loadTrucks() already called in service via tap()
      },
      error: (err) => console.error("Error adding car:", err)
    });
  });
}

  openAddCarDialog(): void {
    // const dialogRef = this.dialog.open(AddCarDialogComponent, {
    //   width: '400px',
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     const tempTruck: MyCar = {
    //       ...result,
    //       id: Math.floor(Math.random() * 1000000)
    //     };

    //     this.trucks.set([...this.trucks(), tempTruck]);

    //     this.truckService.addTruck(result).subscribe({
    //       next: (newTruck) => {
    //         const updatedCars = this.trucks().map(c => c.id === tempTruck.id ? newTruck : c);
    //         this.trucks.set(updatedCars);
    //       },
    //       error: (err) => console.error('Error saving car:', err)
    //     });
    //   }
    // });
  }

editCar(car: MyCar) {
  // Find the truck in the signal array
  console.log('Editing car with id:', car);

    // Send update to the server
    this.carService.updateCar(car).subscribe({
      next: (res) => {
        // Update the signal array with server response
        const list = this.cars().map(c => c.id === res.id ? res : c);
        this.cars.set(list);
      },
      error: (err) => {
        console.error('Update failed:', err);
        // Reload trucks from the server in case of error
        this.loadCars();
      },
  });
}


deleteCar(id: number) {
  this.carService.deleteCar(id).subscribe({
    next: () => {
      console.log('Car deleted successfully');
      this.loadCars(); // ✅ reload the list after delete
    },
    error: (err) => console.error('Error deleting car:', err)
  });
}

  
  detailsCar(car: MyCar) {
  this.dialog.open(CarDetailsDialogComponent, {
    width: '600px',
    data: car
  });
}
}
  


