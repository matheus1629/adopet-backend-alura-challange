import { AbstractControl, FormGroup } from '@angular/forms';
import { States } from '../enums/states.enum';
import { IFormRegisterAccount } from '../interfaces/formRegisterAccount.interface';
import { IPet } from '../interfaces/pet.interface';
import { PetSize } from '../enums/petSize.enum';

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

function getPetSizeKey(petSizeValue: PetSize): string {
  const keys = Object.keys(PetSize);
  const values = Object.values(PetSize);

  const index = values.indexOf(petSizeValue);

  return keys[index];
}

export function fileToBase64(event: Event): Promise<string> {
  return new Promise((resolve, reject) => {
    const inputElement = event.target as HTMLInputElement;

    if (!inputElement.files) {
      reject({ noFiles: true });
      return;
    }
    const file = inputElement.files?.[0];

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      reject({ fileUnsupported: true });
      return;
    }

    const maxSize = 5000000; // 5 MB
    if (file.size > maxSize) {
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

export function clearValues(formDirtyValues: IFormRegisterAccount) {
  const cleanedValues = formDirtyValues;

  if ('firstName' in formDirtyValues) cleanedValues.firstName = formDirtyValues.firstName.trim();
  if ('lastName' in formDirtyValues) cleanedValues.lastName = formDirtyValues.lastName.trim();
  if ('state' in formDirtyValues)
    cleanedValues.state = getStateKey(formDirtyValues.state as States);
  if ('city' in formDirtyValues) cleanedValues.city = formDirtyValues.city.trim();
  if ('email' in formDirtyValues) cleanedValues.email = formDirtyValues.email.trim();

  return cleanedValues;
}

export function clearPetValues(formDirtyValues: IPet) {
  const cleanedPetValues = formDirtyValues;

  if ('name' in formDirtyValues) cleanedPetValues.name = formDirtyValues.name?.trim();
  if ('size' in formDirtyValues)
    cleanedPetValues.size = getPetSizeKey(formDirtyValues.size as PetSize);
  if ('description' in formDirtyValues)
    cleanedPetValues.description = formDirtyValues.description?.trim();

  return cleanedPetValues;
}
