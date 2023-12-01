import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AdopterService } from '../../../services/adopter.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import {
  clearValues,
  comparePassword,
  telMask,
  validateName,
  validateNoWhiteSpace,
} from 'src/shared/utils/form';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/sharedComponents/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-adopter',
  templateUrl: './register-adopter.component.html',
  styleUrls: ['./register-adopter.component.scss'],
})
export class RegisterAdopterComponent implements OnInit {
  buttonRegister: IButtonConfig = {
    innerText: 'Cadastrar',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  statesValues = Object.values(States);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  formSubmitted = false;
  registerAdopterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adopterService: AdopterService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerAdopterForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(255),
            validateName,
            validateNoWhiteSpace,
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(255),
            validateName,
            validateNoWhiteSpace,
          ],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.minLength(10), Validators.maxLength(11)],
        ],
        state: ['', [Validators.required]],
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(255),
            validateNoWhiteSpace,
          ],
        ],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).{8,16}$')],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: comparePassword('password', 'confirmPassword'),
      }
    );
  }

  telMaskForm(): string {
    return telMask(this.registerAdopterForm.value.phoneNumber as string);
  }

  openPopup(message: string, icon: string) {
    this.dialog.open(PopupComponent, {
      data: {
        title: message,
        icon: icon,
      },
    });
  }

  submit() {
    this.formSubmitted = true;
    console.log(this.registerAdopterForm);

    if (this.registerAdopterForm.valid) {
      this.buttonRegister.loading = true;

      const cleanedValuesForm = clearValues(this.registerAdopterForm.value);

      this.adopterService.createAdopter(cleanedValuesForm).subscribe({
        next: (data) => {
          localStorage.setItem('user_token_adopet', data['token']);
          localStorage.setItem('user_type_adopet', data['userType']);
          this.router.navigate(['adopter/pets']);
        },
        error: (err) => {
          console.error('Error: ', err);

          if (err.error.error === 'Email already used') {
            this.openPopup('Email já está em uso.', 'error');
          } else {
            this.openPopup('Ocorreu um erro em nosso servidor.', 'error');
          }
          this.buttonRegister.loading = false;
        },
      });
    }
  }
}
