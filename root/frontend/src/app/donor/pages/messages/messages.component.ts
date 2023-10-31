import { IFilterMessagesPreview } from './../../../../shared/interfaces/filterMessagesPreview.interface';
import { MessageService } from 'src/app/services/message.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';
import { ActivatedRoute } from '@angular/router';

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
      this.filterPageEvent(
        this.paginatorConfig,
        params['petName'],
        params['adopterDonorName'],
        params['dateOrder'],
        params['adoptionStatus']
      );
    });
  }


  setUrlParams(teste:any){

  }

  filterPageEvent(
    pageEvent: PageEvent,
    petName: string,
    adopterDonorName: string,
    dateOrder: string,
    adoptionStatus: string
  ) {
    this.paginatorConfig.pageIndex = pageEvent.pageIndex;
    this.paginatorConfig.pageSize = pageEvent.pageSize;

    this.messageService
      .getAllMessagesByDonorPreview(
        this.paginatorConfig.pageIndex + 1,
        this.paginatorConfig.pageSize,
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
