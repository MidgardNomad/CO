import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDetailsDialogComponent } from './career-details-dialog.component';

describe('CareerDetailsDialogComponent', () => {
  let component: CareerDetailsDialogComponent;
  let fixture: ComponentFixture<CareerDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(CareerDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
