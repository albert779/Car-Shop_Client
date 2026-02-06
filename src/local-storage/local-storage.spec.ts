import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorage } from './local-storage';

describe('LocalStorage', () => {
  let component: LocalStorage;
  let fixture: ComponentFixture<LocalStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalStorage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalStorage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
