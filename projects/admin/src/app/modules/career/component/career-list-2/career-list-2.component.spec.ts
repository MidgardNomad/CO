import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerList2Component } from './career-list-2.component';

describe('CareerList2Component', () => {
  let component: CareerList2Component;
  let fixture: ComponentFixture<CareerList2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerList2Component]
    });
    fixture = TestBed.createComponent(CareerList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
