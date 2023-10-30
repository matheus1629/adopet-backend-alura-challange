import { MessageService } from './../../../services/message.service';
import { SharedService } from './../../../services/shared-services.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { PetService } from 'src/app/services/pet.service';
import { PetSize } from 'src/shared/enums/petSize.enum';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-pets-adopter',
  templateUrl: './pets-adopter.component.html',
  styleUrls: ['./pets-adopter.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class PetsAdopterComponent implements OnInit {
  @Output() selectedPet = new EventEmitter<IPet>();

  pets!: IPet[];
  currentPage = 0;
  pageSize = 10;
  length = 0;
  messagesSendedIdPet!: number[];

  constructor(private petService: PetService, private messageService: MessageService) {}

  ngOnInit(): void {
    const pageEvent: PageEvent = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      length: this.length,
    };

    this.handlePageEvent(pageEvent);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this.messageService
      .getMessagesByAdopter()
      .subscribe((data) => (this.messagesSendedIdPet = data));

    this.petService
      .getAllPetsAvailable(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (data) => {
          this.pets = data.rows;
          this.length = data.count;
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
  }
}
