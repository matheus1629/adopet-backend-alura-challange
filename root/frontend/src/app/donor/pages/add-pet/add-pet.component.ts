import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DonorService } from 'src/app/services/donor.service';
import { SharedService } from 'src/app/services/shared-services.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { States } from 'src/shared/enums/states.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import {
  clearPetValues,
  clearValues,
  fileToBase64,
  telMask,
  validateName,
  validatePetAge,
} from 'src/shared/utils/form';
import { IAccountData } from 'src/shared/interfaces/accountData.interface';
import { IAccountEdit } from 'src/shared/interfaces/accountEdit.interface';
import { IFormRegisterAccount } from 'src/shared/interfaces/formRegisterAccount.interface';
import { textAreaValidation } from '../../../../shared/consts';
import { PopupComponent } from 'src/app/popup/popup.component';
import { PetSize } from 'src/shared/enums/petSize.enum';
import { PetService } from 'src/app/services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit {
  petSizeValues = Object.values(PetSize);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  textAreaValidation = textAreaValidation;
  formSubmitted = false;
  addPetForm!: FormGroup;

  buttonRegister: IButtonConfig = {
    innerText: 'Salvar',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  /*   buttonDelete: IButtonConfig = {
    innerText: 'Deletar Pet',
    class: ButtonClass.BUTTON_TYPE_2,
  }; */

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private petService: PetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.addPetForm = this.fb.group({
      picture: [null, Validators.required],
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(255), validateName],
      ],
      age: ['', [Validators.required, Validators.min(0), Validators.max(99), validatePetAge]],
      size: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(25)]],
    });
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

      const cleanedValuesForm = clearPetValues(this.addPetForm.value);

      console.log(this.addPetForm.value);
      console.log(cleanedValuesForm);

      this.petService.createPet(this.addPetForm.value).subscribe({
        next: (data) => {
          this.openPopup('Pet adicionado para adoção!', 'check_circle');
          this.buttonRegister.loading = false;
          this.router.navigate(['/donor/pets']);
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
