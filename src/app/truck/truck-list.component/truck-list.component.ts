import { MyCar } from './../../car/myCar';
import { Component, signal  } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common'; // ✅ Import AsyncPipe
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TruckService } from '../truck.service';
import { Item } from '../../shared/item/item';
import { DialogAddOrEdit } from '../../shared/dialog-add-or-edit/dialog-add-or-edit';
import { MatDialogModule } from '@angular/material/dialog';
import { CarDetailsDialogComponent } from '../../dialogs/car-details-dialog.component/car-details-dialog.component';

@Component({
  selector: 'app-truck-list',
  standalone: true,
  templateUrl: './truck-list.component.html',
  imports: [
    CommonModule,   
    Item,      // ✅ Needed for *ngIf, @for, etc.
   // AsyncPipe,            // ✅ Fixes "No pipe found with name 'async'"
    MatButtonModule,
    MatDialogModule
    
  ]
})
export class TruckListComponent {
  trucks = signal<MyCar[]>([]);
  dialogRef$!: any;
  constructor(private truckService: TruckService, private dialog: MatDialog) {}
  
  trackById(index: number, truck: MyCar) {
  return truck.id;
  }

  ngOnInit() {
    this.loadTrucks();
  }

loadTrucks() {
  this.truckService.getTrucks().subscribe({
    next: (data) => {
      console.log('📥 Trucks received:', data);
      this.trucks.set(data);  // ✅ Update signal
    },
    error: (err) => console.error('❌ Error loading trucks:', err)
  });

  this.truckService.loadTrucks(); // fetch data from API
}


addTruck() {
   console.log("Add Truck clicked!");
  const dialogRef = this.dialog.open(DialogAddOrEdit, {
    width: '400px',
    data: null // or {} if you prefer
  });

  dialogRef.afterClosed().subscribe((result: MyCar | null | undefined) => {
    if (!result) return; // user closed dialog

    // Remove id for new truck
    result.id = undefined;

    this.truckService.addTruck(result).subscribe({
      next: (savedTruck) => {
        console.log("Truck added:", savedTruck);
        // loadTrucks() already called in service via tap()
      },
      error: (err) => console.error("Error adding truck:", err)
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

editTruck(truck: MyCar) {
  // Find the truck in the signal array
  console.log('Editing truck with id:', truck);

    // Send update to the server
    this.truckService.updateTruck(truck).subscribe({
      next: (res) => {
        // Update the signal array with server response
        const list = this.trucks().map(c => c.id === res.id ? res : c);
        this.trucks.set(list);
      },
      error: (err) => {
        console.error('Update failed:', err);
        // Reload trucks from the server in case of error
        this.loadTrucks();
      },
  });
}


deleteTruck(id: number) {
  this.truckService.deleteTruck(id).subscribe({
    next: () => {
      console.log('Truck deleted successfully');
      this.loadTrucks(); // ✅ reload the list after delete
    },
    error: (err) => console.error('Error deleting truck:', err)
  });
}

 detailsTruck(car: MyCar) {
  this.dialog.open(CarDetailsDialogComponent, {
    width: '600px',
    data: car
  });
}
}
  


