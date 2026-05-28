import { Component, inject,EventEmitter, Output, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle-list.component/vehicle.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent <T extends Record<string, any>> {

  private vehicleService = inject(VehicleService);

    // Full source array
  @Input({ required: true })
  source: T[] = [];
  // Keys allowed for searching
  @Input({ required: true })
  keys: (keyof T)[] = [];
  // Search text/value
  @Input()
  searchValue: unknown = '';
  // Emit filtered results
  @Output()
  result = new EventEmitter<T[]>();


search(value: string): void {

  // Empty search -> return all
  if (!value || value.trim() === '') {

    this.result.emit(this.source);

    return;
  }

  const normalizedSearch =
    value.toLowerCase().trim();

  const filtered = this.source.filter(item => {

    return this.keys.some(key => {

      const fieldValue = item[key];

      // null / undefined safety
      if (fieldValue === null || fieldValue === undefined) {
        return false;
      }

      // Number support
      if (typeof fieldValue === 'number') {

        return String(fieldValue)
          .includes(normalizedSearch);
      }

      // Boolean support
      if (typeof fieldValue === 'boolean') {

        return String(fieldValue)
          .toLowerCase()
          .includes(normalizedSearch);
      }

      // String support
      return String(fieldValue)
        .toLowerCase()
        .includes(normalizedSearch);

    });

  });

  this.result.emit(filtered);
}
}