import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { clearPetValues, fileToBase64, validateName, validatePetAge } from 'src/shared/utils/form';

import { textAreaValidation } from '../../../../shared/consts';
import { PopupComponent } from 'src/app/popup/popup.component';
import { PetSize } from 'src/shared/enums/petSize.enum';
import { PetService } from 'src/app/services/pet.service';
import { Router } from '@angular/router';
import { PopupConfirmComponent } from 'src/app/popupConfirm/popup-confirmation.component';
import { map } from 'rxjs';

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
    innerText: 'Adicionar pet',
    class: ButtonClass.BUTTON_TYPE_2,
  };

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

  onFileSelected(event: Event) {
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

      const clearedPetValues = clearPetValues(this.addPetForm.value);

      this.petService.createPet(clearedPetValues).subscribe({
        next: (data) => {
          this.openPopup('Pet adicionado para adoção!', 'check_circle');
          this.buttonRegister.loading = false;
          this.addPetForm.markAsPristine();
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

  canDeactivate() {
    if (this.addPetForm.dirty) {
      const dialogRef = this.dialog.open(PopupConfirmComponent, {
        data: {
          title: 'Você tem certeza que deseja descartar as alterações?',
          content: 'As alterações serão perdidas se você sair sem salvar.',
          yes: 'Sim',
          no: 'Não',
        },
      });

      return dialogRef.afterClosed().pipe(
        map((result) => {
          if (result) return true;
          else return false;
        })
      );
    } else {
      return true;
    }
  }
}
