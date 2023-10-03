import { AdopterService } from '../../services/adopter.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { IForm } from 'src/shared/interfaces/form.interface';

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
          [Validators.required, Validators.minLength(2), Validators.maxLength(255), this.validateName],
        ],
        lastName: [
          'Silva',
          [Validators.required, Validators.minLength(2), Validators.maxLength(255), this.validateName],
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
        validator: this.comparePassword('password', 'confirmPassword'),
      }
    );
  }

  validateName(control: AbstractControl): { validName: boolean } | null {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

    if (!regex.test(control.value)) return { validName: true };
    control.value;
    return null;
  }

  comparePassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): FormGroup | void => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  telMask = () => {
    let value = this.registerAdopterForm.value.phoneNumber as string;

    if (value.charAt(2) === '9') {
      return '(00) 00000-0000';
    } else {
      return '(00) 0000-0000';
    }
  };

  getStateKey(stateValue: States): string {
    const keys = Object.keys(States);
    const values = Object.values(States);

    const index = values.indexOf(stateValue);

    return keys[index];
  }

  clearValues(formDirtyValues: IForm): IForm {
    const cleanedValues = formDirtyValues;

    cleanedValues.firstName = formDirtyValues.firstName.trim();
    cleanedValues.lastName = formDirtyValues.lastName.trim();
    cleanedValues.state = this.getStateKey(formDirtyValues.state as States);
    cleanedValues.city = formDirtyValues.city.trim();
    cleanedValues.email = formDirtyValues.email.trim();

    return cleanedValues;
  }

  submit() {
    this.formSubmitted = true;

    if (this.registerAdopterForm.valid) {
      const cleanedValuesForm = this.clearValues(this.registerAdopterForm.value);

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
