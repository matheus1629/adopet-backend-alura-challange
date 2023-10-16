import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-pets-adopter',
  templateUrl: './pets-adopter.component.html',
  styleUrls: ['./pets-adopter.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class PetsAdopterComponent implements OnInit {
  pets!: IPet[];
  currentPage = 0;
  pageSize = 5;
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
    console.log(pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this.petService.getAllPetsAvailable(this.currentPage + 1, this.pageSize).subscribe({
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
