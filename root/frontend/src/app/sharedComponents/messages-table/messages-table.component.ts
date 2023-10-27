import { Component, Input } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class MessagesTableComponent {
  @Input() paginatorConfig: any;
}
