import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdopterComponent } from './profile-adopter.component';

describe('ProfileAdopterComponent', () => {
  let component: ProfileAdopterComponent;
  let fixture: ComponentFixture<ProfileAdopterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAdopterComponent]
    });
    fixture = TestBed.createComponent(ProfileAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
