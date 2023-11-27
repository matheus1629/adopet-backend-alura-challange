import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-pets-donor',
  templateUrl: './pets-donor.component.html',
  styleUrls: ['./pets-donor.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class PetsDonorComponent implements OnInit {
  pets!: IPet[];
  paginatorConfig: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  isLoading = true;

  constructor(
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getPetsPageFilter(params['pageIndex'], params['pageSize']);
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.router.navigate([], {
      queryParams: { pageIndex: pageEvent.pageIndex + 1, pageSize: pageEvent.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  getPetsPageFilter(pageIndex: number, pageSize: number) {
    this.paginatorConfig.pageIndex = pageIndex - 1;
    this.paginatorConfig.pageSize = pageSize;

    this.petService.getPetsByDonor(pageIndex, pageSize).subscribe({
      next: (data) => {
        this.pets = data.rows;
        this.paginatorConfig.length = data.count;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error: ', err);
        this.isLoading = false;
      },
    });
  }
}
