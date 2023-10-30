import { MessageService } from 'src/app/services/message.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
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
  paginatorConfig: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  messagesDonorPreview!: IMessagesPreview[];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.handlePageEvent(this.paginatorConfig);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.paginatorConfig.pageIndex = pageEvent.pageIndex;
    this.paginatorConfig.pageSize = pageEvent.pageSize;

    this.messageService
      .getAllMessagesByDonorPreview(
        this.paginatorConfig.pageIndex + 1,
        this.paginatorConfig.pageSize
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messagesDonorPreview = data.rows;
          this.paginatorConfig.length = data.count;
        },
      });
  }
}
