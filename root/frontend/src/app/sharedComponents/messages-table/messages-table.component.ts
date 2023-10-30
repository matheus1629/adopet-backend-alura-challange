import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class MessagesTableComponent implements OnInit {
  @Input() paginatorConfig!: PageEvent;
  @Input() messagesPreview!: IMessagesPreview[];
  @Output() pageEvent = new EventEmitter();
  routeMessage!: string;
  emptyList!: string;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.getUserType() === 'Donor') {
      this.routeMessage = '/donor/messages/details';
      this.emptyList = 'Você ainda não recebeu mensagens...';
    } else if (this.auth.getUserType() === 'Adopter') {
      this.routeMessage = '/adopter/messages/details';
      this.emptyList = 'Você ainda não enviou uma mensagem...';
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent.emit(event);
  }

  infoDisplay(adoptionStatus: string) {
    let adoptionStatusInfo;
    switch (adoptionStatus) {
      case 'Não iniciado':
        adoptionStatusInfo = 'Solicitação ainda não respondida.';
        break;
      case 'Adoção recusada pelo doador':
        adoptionStatusInfo = 'Solicitação recusada pelo doador.';
        break;
      case 'Confirmação pendente':
        adoptionStatusInfo = 'Solicitação pendende para aprovação do adotante.';
        break;
      case 'Adotado':
        adoptionStatusInfo = 'Adotante aceitou adotar o pet.';
        break;
      case 'Adoção recusada pelo adotante':
        adoptionStatusInfo = 'Adotante recusou adotar o pet.';
        break;
      default:
        adoptionStatus = '';
    }

    return adoptionStatusInfo;
  }
}
