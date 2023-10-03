import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AdopterService } from '../../services/adopter.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { clearValues, comparePassword, telMask, validateName } from 'src/shared/utils/form';

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
  estados = States;
  estadosKeys = Object.values(this.estados);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  formSubmitted = false;
  registerAdopterForm!: FormGroup;

  constructor(private fb: FormBuilder, private adopterService: AdopterService) {}

  ngOnInit(): void {
    this.registerAdopterForm = this.fb.group(
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
        city: ['joinville', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
        state: ['Santa Catarina', [Validators.required]],
        email: ['jonh@email.com', [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: ['qweqwe12', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).{8,16}$')]],
        confirmPassword: ['qweqwe12', [Validators.required]],
      },
      {
        validator: comparePassword('password', 'confirmPassword'),
      }
    );
  }

  telMaskForm(): string {
    return telMask(this.registerAdopterForm.value.phoneNumber as string);
  }

  submit() {
    this.formSubmitted = true;

    if (this.registerAdopterForm.valid) {
      const cleanedValuesForm = clearValues(this.registerAdopterForm.value);

      this.adopterService.createAdopter(cleanedValuesForm).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error('Ocorreu um erro: ', err);
        },
      });
    }
  }
}
