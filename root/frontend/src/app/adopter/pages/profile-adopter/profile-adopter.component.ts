import { textAreaValidation } from '../../../../shared/consts';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AdopterService } from '../../../services/adopter.service';
import { SharedService } from 'src/app/services/shared-services.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { clearValues, fileToBase64, telMask, validateName } from 'src/shared/utils/form';
import { IAccountData } from 'src/shared/interfaces/accountData.interface';
import { IAccountEdit } from 'src/shared/interfaces/accountEdit.interface';
import { IFormRegisterAccount } from 'src/shared/interfaces/formRegisterAccount.interface';
import { PopupComponent } from 'src/app/popup/popup.component';

@Component({
  selector: 'app-profile-adopter',
  templateUrl: './profile-adopter.component.html',
  styleUrls: ['./profile-adopter.component.scss'],
})
export class ProfileAdopterComponent implements OnInit, DoCheck {
  statesValues = Object.values(States);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  textAreaValidation = textAreaValidation;
  formSubmitted = false;
  editAdopterForm!: FormGroup;
  pictureUpdatedHeader?: any;

  buttonRegister: IButtonConfig = {
    innerText: 'Salvar',
    class: ButtonClass.BUTTON_TYPE_2,
    disable: true,
  };

  constructor(
    private fb: FormBuilder,
    private adopterService: AdopterService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.adopterService.getAdopter().subscribe({
      next: (data: IAccountData) => {
        this.editAdopterForm.patchValue({
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

  ngDoCheck() {
    if (this.editAdopterForm.dirty) this.buttonRegister.disable = false;
    else this.buttonRegister.disable = true;
  }

  onFileSelected(event: any) {
    fileToBase64(event)
      .then((base64String) => {
        this.editAdopterForm.patchValue({ picture: base64String });
        this.editAdopterForm.get('picture')?.markAsDirty();
      })
      .catch((error) => {
        if (error.fileUnsupported) this.editAdopterForm.get('picture')?.setErrors(error);
        else if (error.fileSizeExceeded) this.editAdopterForm.get('picture')?.setErrors(error);
      });
  }

  telMaskForm(): string {
    return telMask(this.editAdopterForm.value.phoneNumber as string);
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

    if (this.editAdopterForm.valid) {
      this.buttonRegister.loading = true;

      const dirtyFields: IAccountEdit = {};

      const formControlFields = Object.entries(this.editAdopterForm.controls);

      for (let element of formControlFields) {
        if (element[1].dirty === true)
          dirtyFields[element[0] as keyof IAccountEdit] = element[1].value;
      }

      const cleanedValuesForm = clearValues(dirtyFields as IFormRegisterAccount);

      this.adopterService.editAdopter(cleanedValuesForm).subscribe({
        next: (data) => {
          this.openPopup('Alterações salvas!', 'check_circle');
          this.sharedService.pictureSender(data.picture);
          this.editAdopterForm.markAsPristine();
          this.buttonRegister.loading = false;
        },
        error: (err) => {
          console.error('Error: ', err);
          this.openPopup('Ocorreu um erro em nosso servidor.', 'error');
          this.buttonRegister.loading = false;
        },
      });
    }
  }
}
