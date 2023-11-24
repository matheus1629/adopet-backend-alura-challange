import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { IMessageDetails } from 'src/shared/interfaces/messageDetails.interface';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent {
  @Input() idMessage!: number;
  messageDetails!: IMessageDetails;
  buttonRefuse: IButtonConfig = {
    innerText: 'Recusar Adoção',
    class: ButtonClass.BUTTON_TYPE_2,
  };
  buttonAccept: IButtonConfig = {
    innerText: 'Aceitar Adoção',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  constructor(private messageService: MessageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idMessage = this.route.snapshot.params['id'];

    this.messageService.getMessageDetailsById(this.idMessage).subscribe({
      next: (data) => {
        this.messageDetails = data;
        console.log(this.messageDetails);
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  acceptAdoption() {
    throw new Error('Method not implemented.');
  }
  refuseAdoption() {
    throw new Error('Method not implemented.');
  }
}
