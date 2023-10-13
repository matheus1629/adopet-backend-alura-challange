import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsDonorComponent } from './pets-donor.component';

describe('PetsDonorComponent', () => {
  let component: PetsDonorComponent;
  let fixture: ComponentFixture<PetsDonorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetsDonorComponent]
    });
    fixture = TestBed.createComponent(PetsDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
