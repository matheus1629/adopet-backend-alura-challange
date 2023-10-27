import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class MessagesComponent {
  currentPage = 0;
  pageSize = 10;
  length = 0;
}
