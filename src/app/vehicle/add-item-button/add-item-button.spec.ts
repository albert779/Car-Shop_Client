import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemButtonComponent } from './add-item-button';

describe('AddItemButton', () => {
  let component: AddItemButtonComponent;
  let fixture: ComponentFixture<AddItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
