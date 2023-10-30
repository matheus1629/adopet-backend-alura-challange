import { MessageService } from 'src/app/services/message.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';
import { IPaginatorConfig } from 'src/shared/interfaces/paginatorConfig.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class MessagesComponent implements OnInit {
  paginatorConfig: IPaginatorConfig = {
    currentPage: 0,
    pageSize: 10,
    length: 0,
  };
  messagesDonorPreview!: IMessagesPreview[];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getAllMessagesByDonorPreview().subscribe({
      next: (data) => {
        console.log(data);
        this.messagesDonorPreview = data;
      },
    });
  }
}
