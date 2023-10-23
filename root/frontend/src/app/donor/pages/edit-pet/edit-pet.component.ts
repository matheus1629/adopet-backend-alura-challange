import { Component, OnInit, DoCheck, Input } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { IPet } from 'src/shared/interfaces/pet.interface';
import { PopupConfirmComponent } from 'src/app/popupConfirm/popup-confirmation.component';
import { IPetEdit } from 'src/shared/interfaces/petEdit.interface';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss'],
})
export class EditPetComponent implements OnInit {
  @Input() idPet!: number;
  petSizeValues = Object.values(PetSize);
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
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private petService: PetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.idPet = this.route.snapshot.params['id'];

    this.petService.getPetById(this.idPet).subscribe({
      next: (data: IPet) => {
        this.addPetForm.patchValue({
          picture: data.picture,
          name: data.name,
          age: data.age,
          size: PetSize[data.size.toUpperCase() as keyof typeof PetSize].toString(),
          description: data.description,
        });
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });

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

  submitEdit() {
    this.formSubmitted = true;

    if (this.addPetForm.valid) {
      this.buttonRegister.loading = true;

      const dirtyFields: IPetEdit = {};

      const formControlFields = Object.entries(this.addPetForm.controls);

      for (let element of formControlFields) {
        if (element[1].dirty === true) dirtyFields[element[0] as keyof IPetEdit] = element[1].value;
      }

      const clearedPetValues = clearPetValues(dirtyFields as IPet);

      this.petService.editPet(clearedPetValues, this.idPet).subscribe({
        next: (data) => {
          this.openPopup('Pet editado!', 'check_circle');
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

  submitDelete() {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      data: {
        title: 'Você tem certeza que deseja excluir esse pet?',
        content: 'Todas as conversas que envolvem esse pet serão excluídas.',
        yes: 'Excluir',
        no: 'Voltar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.petService.deletePet(this.idPet).subscribe({
          next: (data) => {
            this.openPopup('Pet excluído!', 'check_circle');
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
    });
  }
}
