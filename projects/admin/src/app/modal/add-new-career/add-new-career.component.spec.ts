import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewCareerComponent } from './add-new-career.component';

describe('AddNewCareerComponent', () => {
  let component: AddNewCareerComponent;
  let fixture: ComponentFixture<AddNewCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCareerComponent]
    });
    fixture = TestBed.createComponent(AddNewCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
