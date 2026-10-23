import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHistory } from './support-history';

describe('SupportHistory', () => {
  let component: SupportHistory;
  let fixture: ComponentFixture<SupportHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
