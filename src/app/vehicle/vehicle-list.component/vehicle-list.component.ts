import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from '../search/search';
import { CarDetailsDialogComponent } from '../../dialogs/car-details-dialog.component/car-details-dialog.component';
import { RequestInfoComponent } from '../request-info/request-info';
import { AuthService } from '../../auth/auth';
import { LocalStorageService } from '../../../services/local-storage';
import { VehicleService } from './vehicle.service';
import { MyCarInfo } from '../../models/myCar';
import { MyCarCreateDto } from '../../models/myCarCreateDto';
import { MyCarUpdateDto } from '../../models/MyCarUpdateDto';
import { VehicleType } from '../../models/vehicle-type';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item/item';
import { AddItemButtonComponent } from '../add-item-button/add-item-button';


@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  imports: [
    CommonModule,
    Item,
    MatButtonModule,
    AddItemButtonComponent,
    MatDialogModule,
    SearchComponent
  ]
})
export class VehicleListComponent implements OnInit {

  public VehicleType = VehicleType;

  // 🚗 1 = Car
  // 🚛 2 = Truck
 // @Input({ required: true })
  //vehicleTypeId!: VehicleType;

  //vehicleTypeId: VehicleType = VehicleType.Car;
  vehicleTypeId!: VehicleType;

  @Input()
  title = 'Vehicles';

  vehicles = signal<MyCarInfo[]>([]);
  filteredVehicles = signal<MyCarInfo[]>([]);

  searchText = '';

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private storage: LocalStorageService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
 this.vehicleTypeId = this.route.snapshot.data['vehicleTypeId'];

  console.log('🚗 Vehicle Type:', this.vehicleTypeId);

  if (!this.vehicleTypeId) {
    console.error('❌ vehicleTypeId is missing from route data');
    return;
  }

//this.vehicleTypeId = type;

  if (this.vehicleTypeId=== VehicleType.Car) {
    this.title = 'Cars';
  } else if (this.vehicleTypeId === VehicleType.Truck) {
    this.title = 'Trucks';
  }

  this.loadVehicles();
  }

  trackById(index: number, vehicle: MyCarInfo): number {
    return vehicle.id;
  }

  // =========================
  // LOAD
  // =========================

  loadVehicles(): void {

    this.vehicleService.getAll(this.vehicleTypeId).subscribe({

      next: (response: any) => {

        console.log('📥 Vehicles received:', response);

        //this.vehicles.set(response.data);
        //this.filteredVehicles.set(response.data);
        const vehicles = response.data.$values || response.data || [];

         this.vehicles.set(vehicles);
         this.filteredVehicles.set(vehicles);

      },

      error: (err: any) => {

        console.error('❌ Error loading vehicles:', err);

      }
    });
  }

onSearchResult(results: MyCarInfo[]): void {

  console.log('🔍 Search results:', results);

  this.filteredVehicles.set(results);
}


  // =========================
  // ADD
  // =========================

  addVehicle(vehicle: MyCarCreateDto | MyCarInfo): void {

    if (!vehicle) return;

    const payload: MyCarCreateDto = {

      vehicleTypeId: this.vehicleTypeId,
      model: vehicle.model,
      color: vehicle.color,
      date: vehicle.date,
      price: vehicle.price,
      details: vehicle.details,
      image: vehicle.image

    };

    this.vehicleService.addVehicle(payload).subscribe({

      next: (response: any) => {

        console.log('✅ Vehicle added:', response);

        this.loadVehicles();

      },

      error: (err: any) => {

        console.error('❌ Error adding vehicle:', err);

      }
    });
  }

  // =========================
  // UPDATE
  // =========================

  editVehicle(vehicle: MyCarUpdateDto): void {

    this.vehicleService.updateVehicle(vehicle.id, vehicle).subscribe({

      next: (updated: MyCarInfo) => {
      /*
        const updatedList = this.vehicles().map(v =>
          v.id === updated.id ? updated : v
        );

        this.vehicles.set(updatedList);
        this.filteredVehicles.set(updatedList);
      */
        console.log('✅ Vehicle updated:', updated);
         this.loadVehicles();
      },

      error: (err: any) => {

        console.error('❌ Update failed:', err);

        this.loadVehicles();

      }
    });
  }

  // =========================
  // DELETE
  // =========================

  deleteVehicle(vehicle: MyCarInfo): void {

    this.vehicleService.deleteVehicle(vehicle.id).subscribe({

      next: () => {

        const updatedList =
          this.vehicles().filter(v => v.id !== vehicle.id);

        this.vehicles.set(updatedList);
        this.filteredVehicles.set(updatedList);

        console.log('✅ Vehicle deleted');

      },

      error: (err: any) => {

        console.error('❌ Delete failed:', err);

      }
    });
  }

  // =========================
  // DETAILS
  // =========================

  detailsVehicle(vehicle: MyCarInfo): void {

    this.dialog.open(CarDetailsDialogComponent, {

      width: '600px',
      data: vehicle

    });
  }

  // =========================
  // REQUEST INFO
  // =========================

  openRequestInfoDialog(vehicle: MyCarInfo): void {

    if (!this.authService.isLoggedIn()) {

      alert('Please log in first.');

      return;
    }

    let user = this.authService.getUser();

    if (!user) {

      const stored =
        this.storage.getValueFromStore('user');

      if (!stored) {

        alert('User info missing.');

        return;
      }

      try {

        user =
          typeof stored === 'string'
            ? JSON.parse(stored)
            : stored;

      } catch (error) {

        console.error(error);

        alert('Invalid user data.');

        return;
      }
    }

    this.dialog.open(RequestInfoComponent, {

      width: '400px',

      data: {
        user,
        vehicle
      }

    });
  }
}