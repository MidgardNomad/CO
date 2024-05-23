import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareerComponent } from './edit-career.component';

describe('EditCareerComponent', () => {
  let component: EditCareerComponent;
  let fixture: ComponentFixture<EditCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCareerComponent]
    });
    fixture = TestBed.createComponent(EditCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
