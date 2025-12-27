import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOrEdit } from './dialog-add-or-edit';

describe('DialogAddOrEdit', () => {
  let component: DialogAddOrEdit;
  let fixture: ComponentFixture<DialogAddOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddOrEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddOrEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
