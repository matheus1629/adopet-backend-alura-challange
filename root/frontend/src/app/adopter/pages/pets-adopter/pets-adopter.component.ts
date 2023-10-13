import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-pets-adopter',
  templateUrl: './pets-adopter.component.html',
  styleUrls: ['./pets-adopter.component.scss'],
})
export class PetsAdopterComponent implements OnInit {
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
