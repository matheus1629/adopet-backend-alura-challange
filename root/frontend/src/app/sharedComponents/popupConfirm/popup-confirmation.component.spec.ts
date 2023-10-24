import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmComponent } from './popup-confirmation.component';

describe('PopupComponent', () => {
  let component: PopupConfirmComponent;
  let fixture: ComponentFixture<PopupConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupConfirmComponent]
    });
    fixture = TestBed.createComponent(PopupConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
