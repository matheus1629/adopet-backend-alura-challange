import { textAreaValidation } from '../../../../shared/consts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { MessageService } from 'src/app/services/message.service';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';

import { PopupComponent } from 'src/app/sharedComponents/popup/popup.component';
import { PopupConfirmComponent } from 'src/app/sharedComponents/popupConfirm/popup-confirmation.component';
import { ISendMessage } from 'src/shared/interfaces/sendMessage.interface';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  errorMessages = errorMessages;
  textAreaValidation = textAreaValidation;
  formSubmitted = false;
  messsageForm!: FormGroup;
  petData!: IPet;
  buttonRegister: IButtonConfig = {
    innerText: 'Enviar mensagem',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.petData = navigation?.extras.state?.['petData'];
  }

  ngOnInit(): void {
    this.messsageForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      contactMessage: [
        '',
        [Validators.required, Validators.minLength(20), Validators.maxLength(2000)],
      ],
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

    if (this.messsageForm.valid) {
      this.buttonRegister.loading = true;

      const body: ISendMessage = {
        subject: this.messsageForm.value.subject,
        contactMessage: this.messsageForm.value.contactMessage,
        idPet: this.petData.id,
      };

      this.messageService.createMessage(body).subscribe({
        next: () => {
          this.messsageForm.markAsPristine();
          this.router.navigate(['/adopter/pets']);
          window.scrollTo(0, 0);
          this.openPopup(
            `Mensagem enviada! Agora é só aguardar a resposta do(a) ${this.petData.Donor?.firstName}.`,
            'check_circle'
          );
        },
        error: (err) => {
          console.error('Error: ', err);

          if (err.error === 'You already send a message about this pet') {
            this.messsageForm.markAsPristine();
            this.openPopup(
              'Você já enviou mensagem para esse contato. Por favor, aguarde o retorno',
              'error'
            );
            this.router.navigate(['/adopter/pets']);
            window.scrollTo(0, 0);
          } else if (err.error === 'This pet was already adopted') {
            this.messsageForm.markAsPristine();
            this.openPopup('Esse pet já foi adotado', 'error');
            this.router.navigate(['/adopter/pets']);
            window.scrollTo(0, 0);
          } else {
            this.openPopup('Ocorreu um erro em nosso servidor.', 'error');
          }

          this.buttonRegister.loading = false;
        },
      });
    }
  }

  canDeactivate() {
    if (this.messsageForm.dirty) {
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
