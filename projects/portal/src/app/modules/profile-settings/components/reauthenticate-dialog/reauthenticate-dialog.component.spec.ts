import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReauthenticateDialogComponent } from './reauthenticate-dialog.component';

describe('ReauthenticateDialogComponent', () => {
  let component: ReauthenticateDialogComponent;
  let fixture: ComponentFixture<ReauthenticateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReauthenticateDialogComponent]
    });
    fixture = TestBed.createComponent(ReauthenticateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
