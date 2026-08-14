import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { TableOfRequests } from './table-of-requests';
import { TableOfRequestsComponent } from './table-of-requests';

describe('TableOfRequests', () => {
  let component: TableOfRequestsComponent;
  let fixture: ComponentFixture<TableOfRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOfRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfRequestsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
