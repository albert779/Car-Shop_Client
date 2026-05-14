import { Component, inject,EventEmitter, Output, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../car/car.service';
import { MyCarInfo } from '../models/myCar';

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

  private carService = inject(CarService);

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



  // ngOnChanges(changes: SimpleChanges): void {
  //   this.search();
  // }

 search(): void {

    // Empty search -> return original source
    if (
      this.searchValue === null ||
      this.searchValue === undefined ||
      String(this.searchValue).trim() === ''
    ) {
      this.result.emit(this.source);
      return;
    }

    const normalizedSearch = String(this.searchValue)
      .toLowerCase()
      .trim();

    const filtered = this.source.filter(item => {

      return this.keys.some(key => {

        const value = item[key];

        // null / undefined safety
        if (value === null || value === undefined) {
          return false;
        }

        // Number support
        if (typeof value === 'number') {
          return String(value).includes(normalizedSearch);
        }

        // Boolean support
        if (typeof value === 'boolean') {
          return String(value)
            .toLowerCase()
            .includes(normalizedSearch);
        }

        // String + fallback support
        return String(value)
          .toLowerCase()
          .includes(normalizedSearch);

      });

    });

    this.result.emit(filtered);
  }

}

