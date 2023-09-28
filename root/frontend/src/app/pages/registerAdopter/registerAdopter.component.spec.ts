import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdopterComponent } from './registerAdopter.component';

describe('RegisterAdopterComponent', () => {
  let component: RegisterAdopterComponent;
  let fixture: ComponentFixture<RegisterAdopterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAdopterComponent]
    });
    fixture = TestBed.createComponent(RegisterAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
