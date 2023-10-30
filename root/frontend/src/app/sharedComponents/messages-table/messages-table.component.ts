import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';
import { IPaginatorConfig } from 'src/shared/interfaces/paginatorConfig.interface';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class MessagesTableComponent {
  @Input() paginatorConfig!: PageEvent;
  @Input() messagesPreview!: IMessagesPreview[];
  @Output() pageEvent = new EventEmitter();

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
