import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerSessionsComponent } from './career-sessions.component';

describe('CareerSessionsComponent', () => {
  let component: CareerSessionsComponent;
  let fixture: ComponentFixture<CareerSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerSessionsComponent]
    });
    fixture = TestBed.createComponent(CareerSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
