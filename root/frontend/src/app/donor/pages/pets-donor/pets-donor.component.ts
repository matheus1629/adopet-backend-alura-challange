import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { PetService } from 'src/app/services/pet.service';
import { PetSize } from 'src/shared/enums/petSize.enum';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-pets-donor',
  templateUrl: './pets-donor.component.html',
  styleUrls: ['./pets-donor.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class PetsDonorComponent implements OnInit {
  pets!: IPet[];
  currentPage = 0;
  pageSize = 10;
  length = 0;

  constructor(private petService: PetService) {}

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

    this.petService.getPetsByDonor(this.currentPage + 1, this.pageSize).subscribe({
      next: (data) => {
        const newData: IPet[] = [];

        for (let pet of data.rows) {
          newData.push({ ...pet, size: PetSize[pet.size.toUpperCase() as keyof typeof PetSize] });
        }

        this.pets = newData;
        this.length = data.count;
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }
}
