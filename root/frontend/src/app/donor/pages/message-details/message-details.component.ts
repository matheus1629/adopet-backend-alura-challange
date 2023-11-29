import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { IMessageDetails } from 'src/shared/interfaces/messageDetails.interface';
import { PopupComponent } from 'src/app/sharedComponents/popup/popup.component';
import { AdoptionStatus } from 'src/shared/enums/adoptionStatus.enum';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent {
  @Input() idMessage!: number;
  messageDetails!: IMessageDetails;
  adoptionStatus = AdoptionStatus;
  buttonRefuse: IButtonConfig = {
    innerText: 'Recusar Adoção',
    class: ButtonClass.BUTTON_TYPE_2,
  };
  buttonAccept: IButtonConfig = {
    innerText: 'Aceitar Adoção',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.idMessage = this.route.snapshot.params['id'];

    this.messageService.getDonorMessageDetailsById(this.idMessage).subscribe({
      next: (data) => {
        this.messageDetails = data;
      },
      error: (err) => {
        this.router.navigate(['/donor/messages']);
        this.openPopup('Mensagem não encontrada.', 'error');
        console.error('Error: ', err);
      },
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

  adoptionAccepted() {
    this.messageService
      .updateMessageAdoptionStatus(this.idMessage, {
        adoptionStatus: 'DONOR_ACCEPTED',
        idPet: this.messageDetails.Pet.id,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/donor/messages']);
          this.openPopup(
            `O pet ${this.messageDetails.Pet.name} encontrou um novo lar! ${this.messageDetails.Adopter.firstName} ${this.messageDetails.Adopter.lastName} agora é seu novo dono.`,
            'check_circle'
          );
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
  }

  adoptionRefused() {
    this.messageService
      .updateMessageAdoptionStatus(this.idMessage, {
        adoptionStatus: 'DONOR_REFUSED',
        idPet: this.messageDetails.Pet.id,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/donor/messages']);
          this.openPopup(
            `Solicitação de adoção enviada pelo(a) ${this.messageDetails.Adopter.firstName} ${this.messageDetails.Adopter.lastName} recusada com sucesso.`,
            'check_circle'
          );
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
  }
}
