import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCareerComponent } from './delete-career.component';

describe('DeleteCareerComponent', () => {
  let component: DeleteCareerComponent;
  let fixture: ComponentFixture<DeleteCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCareerComponent]
    });
    fixture = TestBed.createComponent(DeleteCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
