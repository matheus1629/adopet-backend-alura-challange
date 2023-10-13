import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsAdopterComponent } from './pets-adopter.component';

describe('PetsAdopterComponent', () => {
  let component: PetsAdopterComponent;
  let fixture: ComponentFixture<PetsAdopterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetsAdopterComponent]
    });
    fixture = TestBed.createComponent(PetsAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
