import { AbstractControl, FormGroup } from '@angular/forms';
import { States } from '../enums/states.enum';
import { IFormRegisterAccount } from '../interfaces/formRegisterAccount.interface';
import { IAccountEdit } from '../interfaces/accountEdit.interface';

export function validateName(control: AbstractControl): { validName: boolean } | null {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

  if (!regex.test(control.value)) return { validName: true };

  return null;
}

export function comparePassword(controlName: string, matchingControlName: string) {
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

export function telMask(value: string) {
  if (value.charAt(2) === '9') return '(00) 00000-0000';

  return '(00) 0000-0000';
}

function getStateKey(stateValue: States): string {
  const keys = Object.keys(States);
  const values = Object.values(States);

  const index = values.indexOf(stateValue);

  return keys[index];
}

export function fileToBase64(event: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      console.log('erro no tipo');
      reject({ fileUnsupported: true });
      return;
    }

    const maxSize = 5000000; // 5 MB
    if (file.size > maxSize) {
      console.log('erro no tamanho');
      reject({ fileSizeExceeded: true });
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(file);
  });
}

export function clearValues(formDirtyValues: IFormRegisterAccount & IAccountEdit) {
  const cleanedValues = formDirtyValues;

  cleanedValues.firstName = formDirtyValues.firstName?.trim();
  cleanedValues.lastName = formDirtyValues.lastName?.trim();
  cleanedValues.state = getStateKey(formDirtyValues?.state as States);
  cleanedValues.city = formDirtyValues.city?.trim();
  if ('email' in formDirtyValues) cleanedValues.email = formDirtyValues.email.trim();

  return cleanedValues;
}
