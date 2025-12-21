import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CarService } from '../car/car.service';
import { CarsComponent } from "../car/car.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddCarDialogComponent } from '../add-car-dialog.component/add-car-dialog.component';
import { MyCar } from '../car/myCar';
import { CarDetailsDialogComponent } from '../car-details-dialog.component/car-details-dialog.component';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CarsComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars$: Observable<MyCar[]> | undefined;
  //loading = signal(true);
  //loading =LoadingService;
  cars = signal<MyCar[]>([]);

  constructor(private carService: CarService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }

  /** ✅ Load all cars from backend */
  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars.set(data);
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  openAddCarDialog(): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const tempCar: MyCar = {
          ...result,
          id: Math.floor(Math.random() * 1000000)
        };

        this.cars.set([...this.cars(), tempCar]);

        this.carService.addCar(result).subscribe({
          next: (newCar) => {
            const updatedCars = this.cars().map(c => c.id === tempCar.id ? newCar : c);
            this.cars.set(updatedCars);
          },
          error: (err) => console.error('Error saving car:', err)
        });
      }
    });
  }

  editCar(car: MyCar) {
    const dialogRef = this.dialog.open(AddCarDialogComponent, { data: car });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      const updatedCar: MyCar = { ...result, id: car.id };
      const updatedList = this.cars().map(c => c.id === car.id ? updatedCar : c);
      this.cars.set(updatedList);

      this.carService.updateCar(updatedCar).subscribe({
        next: (res) => {
          const finalList = this.cars().map(c => c.id === res.id ? res : c);
          this.cars.set(finalList);
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.loadCars();
        }
      });
    });
  }

  deleteCar(carId: number): void {
    if (!confirm('Are you sure you want to delete this car?')) return;

    const currentCars = this.cars();
    this.cars.set(currentCars.filter(c => c.id !== carId));

    this.carService.deleteCar(carId).subscribe({
      next: () => console.log('Car deleted successfully'),
      error: (err) => {
        console.error('Error deleting car:', err);
        this.cars.set(currentCars);
      }
    });
  }

  detailsCar(car: MyCar) {
    //alert(car.id);
    this.dialog.open(CarDetailsDialogComponent, {
      data: car,
      width: '400px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '150ms'
    });
  }
}


