import { Component, OnInit } from '@angular/core';

import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-pets-donor',
  templateUrl: './pets-donor.component.html',
  styleUrls: ['./pets-donor.component.scss'],
})
export class PetsDonorComponent implements OnInit {
  pets!: IPet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getAllPetsAvailable().subscribe({
      next: (data) => {
        this.pets = data;
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }
}
