import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';

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
import { PopupConfirmComponent } from 'src/app/popupConfirm/popup-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-donor',
  templateUrl: './profile-donor.component.html',
  styleUrls: ['./profile-donor.component.scss'],
})
export class ProfileDonorComponent implements OnInit, DoCheck {
  statesValues = Object.values(States);
  errorMessages = errorMessages;
  inputValidations = inputValidations;
  textAreaValidation = textAreaValidation;
  formSubmitted = false;
  editAdopterForm!: FormGroup;

  buttonRegister: IButtonConfig = {
    innerText: 'Salvar',
    class: ButtonClass.BUTTON_TYPE_2,
    disable: true,
  };

  buttonDelete: IButtonConfig = {
    innerText: 'Deletar Conta',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private donorService: DonorService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.donorService.getDonor().subscribe({
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

  onFileSelected(event: Event) {
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
    return telMask(this.editAdopterForm.value.phoneNumber);
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

      this.donorService.editDonor(cleanedValuesForm).subscribe({
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

  canDeactivate() {
    if (this.editAdopterForm.dirty) {
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

  submitDelete() {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      data: {
        title: 'Você tem certeza que deseja deletar sua conta?',
        content: 'Todo o seu histórico do chat e seus pets para adoção serão perdidos.',
        yes: 'Deletar Conta',
        no: 'Voltar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donorService.deleteDonor().subscribe({
          next: (data) => {
            this.buttonRegister.loading = false;
            this.editAdopterForm.markAsPristine();
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error: ', err);
            this.openPopup('Ocorreu um erro em nosso servidor.', 'error');
            this.buttonRegister.loading = false;
          },
        });
      }
    });
  }
}
