import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestsTs } from './my-requests.ts';

describe('MyRequestsComponent', () => {
  let component: MyRequestsComponent;
  let fixture: ComponentFixture<MyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRequestsTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRequestsTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
