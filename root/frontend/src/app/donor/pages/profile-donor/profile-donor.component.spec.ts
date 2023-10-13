import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDonorComponent } from './profile-donor.component';

describe('ProfileDonorComponent', () => {
  let component: ProfileDonorComponent;
  let fixture: ComponentFixture<ProfileDonorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDonorComponent]
    });
    fixture = TestBed.createComponent(ProfileDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
