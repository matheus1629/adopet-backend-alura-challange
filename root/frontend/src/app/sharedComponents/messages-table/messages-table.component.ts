import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';

import { AdoptionStatus } from 'src/shared/enums/adoptionStatus.enum';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';

import { clearFilterValues } from 'src/shared/utils/form';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class MessagesTableComponent implements OnInit {
  @Input() paginatorConfig!: PageEvent;
  @Input() messagesPreview!: IMessagesPreview[];
  adoptionStatus = Object.values(AdoptionStatus);
  routeMessageDetails!: string;
  @Input() buttonFilter!: IButtonConfig;
  @Input() buttonClearFilter!: IButtonConfig;
  filterForm!: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.getUserType() === 'Donor') this.routeMessageDetails = '/donor/message-details/';
    else if (this.auth.getUserType() === 'Adopter')
      this.routeMessageDetails = '/adopter/message-details/';

    this.filterForm = this.fb.group({
      petName: ['', Validators.maxLength(255)],
      adopterDonorName: ['', Validators.maxLength(255)],
      dateOrder: ['desc'],
      adoptionStatus: [''],
    });
  }

  handlePageEvent(event: PageEvent) {
    this.router.navigate([], {
      queryParams: { pageIndex: event.pageIndex + 1, pageSize: event.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  infoDisplay(adoptionStatus: string) {
    let adoptionStatusInfo;
    switch (adoptionStatus) {
      case 'Confirmação pendente':
        adoptionStatusInfo = 'Solicitação pendende para aprovação do doador.';
        break;
      case 'Adoção recusada pelo doador':
        adoptionStatusInfo = 'Solicitação de adoção recusada pelo doador.';
        break;
      case 'Adoção aceita pelo doador':
        adoptionStatusInfo = 'Solicitação de adoção aceita pelo doador.';
        break;
      case 'Pet já adotado por outra pessoa':
        adoptionStatusInfo = 'Este pet já foi adotado por outra pessoa.';
        break;
      default:
        adoptionStatus = '';
    }

    return adoptionStatusInfo;
  }

  filter() {
    const cleanedFilterValues = clearFilterValues(this.filterForm.value);

    this.router.navigate([], {
      queryParams: {
        petName: cleanedFilterValues.petName,
        adopterDonorName: cleanedFilterValues.adopterDonorName,
        dateOrder: cleanedFilterValues.dateOrder,
        adoptionStatus: cleanedFilterValues.adoptionStatus,
        pageIndex: 1,
        pageSize: 10,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilter() {
    this.filterForm.setValue({
      petName: '',
      adopterDonorName: '',
      dateOrder: 'desc',
      adoptionStatus: '',
    });
    this.router.navigate([], {
      queryParams: {},
    });
  }
}
