import { textAreaValidation } from './../../../shared/consts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AdopterService } from '../../services/adopter.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { clearValues, telMask, validateName } from 'src/shared/utils/form';
import { Router } from '@angular/router';
import { IAccountData } from 'src/shared/interfaces/accountData.interface';
import { IAdopterEdit } from 'src/shared/interfaces/accountEdit.interface';

@Component({
  selector: 'app-profile-adopter',
  templateUrl: './profile-adopter.component.html',
  styleUrls: ['./profile-adopter.component.scss'],
})
export class ProfileAdopterComponent implements OnInit {
  buttonRegister: IButtonConfig = {
    innerText: 'Salvar',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  statesValues = Object.values(States);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  textAreaValidation = textAreaValidation;
  formSubmitted = false;
  editAdopterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adopterService: AdopterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adopterService.getAdopter<IAccountData>().subscribe({
      next: (data: IAccountData) => {
        console.log(data);
        this.editAdopterForm.setValue({
          picture: data.picture,
          firstName: data.firstName,
          lastName: data.lastName,
          state: States[data.state as keyof typeof States].toString(),
          city: data.city,
          phoneNumber: data.phoneNumber,
          personalInfo: data.personalInfo,
        });
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });

    this.editAdopterForm = this.fb.group({
      picture: [null],
      firstName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(255), validateName],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(255), validateName],
      ],
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      personalInfo: ['', [Validators.maxLength(2000)]],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    const maxSize = 5000000; // 5 MB
    if (file.size > maxSize) {
      console.log('erro no tamanho');
      this.editAdopterForm.get('picture')?.setErrors({ fileSizeExceeded: true });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      console.log('erro no tipo');
      this.editAdopterForm.get('picture')?.setErrors({ fileUnsupported: true });
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.editAdopterForm.patchValue({ picture: reader.result as string });
    };

    reader.readAsDataURL(file);
  }

  telMaskForm(): string {
    return telMask(this.editAdopterForm.value.phoneNumber as string);
  }

  submit() {
    this.formSubmitted = true;

    let dirtyFields: IAdopterEdit;

    if (this.editAdopterForm.valid) {
      const formControlFields = Object.entries(this.editAdopterForm.controls);

       formControlFields.forEach((element) => {
        if (element[1].dirty === true)
 
        
          dirtyFields[element[0] as keyof IAdopterEdit] = element[1]?.value;
        console.log(dirtyFields);
      });


      const cleanedValuesForm = clearValues(this.editAdopterForm.value);

      this.adopterService.editAdopter(cleanedValuesForm).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
    }
  }
}
