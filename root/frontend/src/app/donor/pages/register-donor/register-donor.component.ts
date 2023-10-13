import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { DonorService } from 'src/app/services/donor.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { clearValues, comparePassword, telMask, validateName } from 'src/shared/utils/form';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-donor',
  templateUrl: './register-donor.component.html',
  styleUrls: ['./register-donor.component.scss'],
})
export class RegisterDonorComponent implements OnInit {
  buttonRegister: IButtonConfig = {
    innerText: 'Cadastrar',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  statesValues = Object.values(States);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  formSubmitted = false;
  registerDonorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerDonorForm = this.fb.group(
      {
        firstName: [
          'Fulano',
          [Validators.required, Validators.minLength(2), Validators.maxLength(255), validateName],
        ],
        lastName: [
          'Silva',
          [Validators.required, Validators.minLength(2), Validators.maxLength(255), validateName],
        ],
        phoneNumber: [
          '2222222222',
          [Validators.required, Validators.minLength(10), Validators.maxLength(11)],
        ],
        state: ['Santa Catarina', [Validators.required]],
        city: [
          'joinville',
          [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
        ],
        email: [
          'jonh@email.com',
          [Validators.required, Validators.email, Validators.maxLength(255)],
        ],
        password: [
          'qweqwe12',
          [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).{8,16}$')],
        ],
        confirmPassword: ['qweqwe12', [Validators.required]],
      },
      {
        validator: comparePassword('password', 'confirmPassword'),
      }
    );
  }

  telMaskForm(): string {
    return telMask(this.registerDonorForm.value.phoneNumber as string);
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

    if (this.registerDonorForm.valid) {
      this.buttonRegister.loading = true;
      
      const cleanedValuesForm = clearValues(this.registerDonorForm.value);

      this.donorService.createDonor(cleanedValuesForm).subscribe({
        next: (data) => {
          console.log(data);
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
