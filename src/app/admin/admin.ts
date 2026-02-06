import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-admin',
  template: `
    <h1>Admin Page</h1>
    <p>If you see this, you HAVE permission 🎉</p>
  `
})
export class AdminComponent {}