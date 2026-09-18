import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsDialog } from './request-details-dialog';

describe('RequestDetailsDialog', () => {
  let component: RequestDetailsDialog;
  let fixture: ComponentFixture<RequestDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDetailsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
