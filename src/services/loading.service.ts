import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Signal to represent loading state
  private activeRequests = signal(0);
  loading =  computed(() => {
  const result = this.activeRequests() > 0
  
  console.log(`load status is : ${result}`);
   return result;
  });
  
  show() {
    this.activeRequests.update(v => v + 1);
  }

  hide() {
    this.activeRequests.update(v => Math.max(0, v - 1));
  }

  reset() {
    this.activeRequests.set(0);
  }
}