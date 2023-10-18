import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DonorService } from 'src/app/services/donor.service';
import { SharedService } from 'src/app/services/shared-services.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { clearValues, fileToBase64, telMask, validateName } from 'src/shared/utils/form';
import { IAccountData } from 'src/shared/interfaces/accountData.interface';
import { IAccountEdit } from 'src/shared/interfaces/accountEdit.interface';
import { IFormRegisterAccount } from 'src/shared/interfaces/formRegisterAccount.interface';
import { textAreaValidation } from '../../../../shared/consts';
import { PopupComponent } from 'src/app/popup/popup.component';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit, DoCheck {
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  textAreaValidation = textAreaValidation;
  formSubmitted = false;
  addPetForm!: FormGroup;

  buttonRegister: IButtonConfig = {
    innerText: 'Salvar',
    class: ButtonClass.BUTTON_TYPE_2,
    disable: true,
  };

  buttonDelete: IButtonConfig = {
    innerText: 'Deletar Pet',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.addPetForm = this.fb.group({
      picture: [null, Validators.required],
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(255), validateName],
      ],
      age: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      size: ['', [Validators.required]],

      personalInfo: ['', [Validators.maxLength(2000)]],
    });
  }

  ngDoCheck() {
    if (this.addPetForm.dirty) this.buttonRegister.disable = false;
    else this.buttonRegister.disable = true;
  }

  onFileSelected(event: any) {
    fileToBase64(event)
      .then((base64String) => {
        this.addPetForm.patchValue({ picture: base64String });
        this.addPetForm.get('picture')?.markAsDirty();
      })
      .catch((error) => {
        if (error.fileUnsupported) this.addPetForm.get('picture')?.setErrors(error);
        else if (error.fileSizeExceeded) this.addPetForm.get('picture')?.setErrors(error);
      });
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

    if (this.addPetForm.valid) {
      this.buttonRegister.loading = true;

      const dirtyFields: IAccountEdit = {};

      const formControlFields = Object.entries(this.addPetForm.controls);

      for (let element of formControlFields) {
        if (element[1].dirty === true)
          dirtyFields[element[0] as keyof IAccountEdit] = element[1].value;
      }

      const cleanedValuesForm = clearValues(dirtyFields as IFormRegisterAccount & IAccountEdit);

      this.donorService.editDonor(cleanedValuesForm).subscribe({
        next: (data) => {
          this.openPopup('Alterações salvas!', 'check_circle');
          this.sharedService.pictureSender(data.picture);
          this.addPetForm.markAsPristine();
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
