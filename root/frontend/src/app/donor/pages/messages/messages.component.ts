import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'src/app/services/message.service';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';

import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';

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

  constructor(private messageService: MessageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.handleFilterPage(
        params['pageIndex'],
        params['pageSize'],
        params['petName'],
        params['adopterDonorName'],
        params['dateOrder'],
        params['adoptionStatus']
      );
    });
  }

  handleFilterPage(
    pageIndex: number,
    pageSize: number,
    petName: string,
    adopterDonorName: string,
    dateOrder: string,
    adoptionStatus: string
  ) {
    this.paginatorConfig.pageIndex = pageIndex - 1;
    this.paginatorConfig.pageSize = pageSize;

    this.messageService
      .getAllMessagesByDonorPreview(
        pageIndex,
        pageSize,
        petName,
        adopterDonorName,
        dateOrder,
        adoptionStatus
      )
      .subscribe({
        next: (data) => {
          this.messagesDonorPreview = data.rows;
          this.paginatorConfig.length = data.count;
        },
      });
  }
}
